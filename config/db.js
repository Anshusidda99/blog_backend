// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ❤️`);
  } catch (error) {
    console.error('MongoDB connection failed');
    process.exit(1); // Exit on error
  }
};

module.exports = connectDB;
