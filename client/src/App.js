import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // This connects to your Node.js server!
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MERN E-Commerce Store</h1>
      
      <div style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', width: '200px' }}>
        <strong>Cart: {cart.length} items</strong>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <h2>Products from Database:</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h3>{product.name}</h3>
              <p style={{ fontSize: '20px', color: '#555' }}>${product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Loading products from MongoDB...</p>
        )}
      </div>
    </div>
  );
}

export default App;