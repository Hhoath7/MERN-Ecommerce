import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // Controls which page we see

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert(`Success! Your order for $${calculateTotal()} has been placed.`);
    setCart([]); // Empty the cart after buying
    setShowCart(false); // Go back to the main store
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#333', cursor: 'pointer' }} onClick={() => setShowCart(false)}>
          MERN Store
        </h1>
        
        {/* Clickable Cart Button */}
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}
        >
          {showCart ? "Back to Store" : `🛒 Cart: ${cart.length} items`}
        </button>
      </div>

      {/* Conditionally Show Store OR Cart */}
      {!showCart ? (
        <>
          <h2 style={{ marginBottom: '20px', color: '#444' }}>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
            {products.length > 0 ? (
              products.map(product => (
                <div key={product._id} style={{ border: '1px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                    <h3 style={{ margin: '5px 0 10px 0', fontSize: '18px', color: '#222' }}>{product.name}</h3>
                    <p style={{ color: '#666', fontSize: '14px', flexGrow: 1, margin: '0 0 20px 0', lineHeight: '1.5' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#111' }}>${product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading products from MongoDB...</p>
            )}
          </div>
        </>
      ) : (
        /* The Shopping Cart Page */
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px' }}>
          <h2>Your Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty. Go add some products!</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
                  <span>{item.name}</span>
                  <div>
                    <span style={{ fontWeight: 'bold', marginRight: '15px' }}>${item.price}</span>
                    <button onClick={() => removeFromCart(index)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', padding: '5px 10px' }}>X</button>
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '24px', fontWeight: 'bold' }}>
                Total: ${calculateTotal()}
              </div>

              <button 
                onClick={handleCheckout}
                style={{ width: '100%', padding: '15px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
