// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send("🎉 Welcome to Anshu's Blog API! 🎉");
});


// Test route
const blogRoutes = require('./route/blogRoute');
app.use('/api/blogs', blogRoutes);
const authRoutes = require('./route/auth');
app.use('/api/auth', authRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
