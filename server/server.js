const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected successfully!'))
  .catch(err => console.log('Database connection error: ', err));

// A simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working perfectly!" });
});

app.listen(5000, () => console.log('Server running on port 5000'));