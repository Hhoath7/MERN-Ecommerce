const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected successfully!'))
  .catch(err => console.log('Database connection error: ', err));

// 2. Define the Product Schema (How data looks in the database)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

// 3. Route to fetch all products for the frontend
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 4. A temporary "Seed" route to easily load data into your database
app.get('/api/seed', async (req, res) => {
  const sampleProducts = [
    { name: "Wireless Headphones", price: 99.99, description: "High-quality noise-canceling headphones.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", category: "Electronics" },
    { name: "Smart Fitness Watch", price: 149.50, description: "Track your health and daily steps.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category: "Electronics" },
    { name: "Running Sneakers", price: 89.99, description: "Comfortable and lightweight for daily wear.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", category: "Apparel" },
    { name: "Hydrating Face Serum", price: 24.99, description: "Daily moisture boost for glowing skin.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", category: "Beauty" },
    { name: "Mechanical Keyboard", price: 120.00, description: "Clicky switches for fast typing and coding.", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", category: "Electronics" },
    { name: "Designer Sunglasses", price: 55.00, description: "Premium UV protection with style.", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", category: "Accessories" }
  ];
  
  try {
    await Product.deleteMany(); // Clears out any old test data
    await Product.insertMany(sampleProducts); // Inserts the new batch
    res.json({ message: "SUCCESS! Database loaded with new products. You can close this tab." });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed database" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));