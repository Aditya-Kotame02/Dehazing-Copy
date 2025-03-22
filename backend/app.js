const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const imageRoutes = require("./src/routes/imageRoutes");

dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve processed images statically

// Connect to Database
connectDB();

// Routes
app.use("/api/image", imageRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
