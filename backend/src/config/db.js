// backend/src/config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    console.log("⏳ Attempting to connect to MongoDB...");
    console.log("Connection URI:", process.env.MONGO_URI); // Log the connection string
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.error("Full Error:", error); // Log the full error object
    process.exit(1);
  }
};

module.exports = connectDB;