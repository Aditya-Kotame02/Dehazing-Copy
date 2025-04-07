const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const WebSocket = require("ws");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./src/models/User");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set Mongoose strictQuery to false
mongoose.set("strictQuery", false);

// Database connection
const connectDB = async () => {
    try {
        console.log("⏳ Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed: ", err.message);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected. Total clients:", wss.clients.size);
    ws.send(JSON.stringify({ type: "stats", data: systemStats }));
    ws.on("close", () => {
        console.log("Client disconnected. Total clients:", wss.clients.size);
    });
    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
});

// Function to broadcast messages to all connected clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
    console.log("Broadcasted system stats to all clients");
};

// Initialize system stats with accuracy
let systemStats = {
    processedImages: 0,
    successfulImages: 0,
    avgProcessingTime: 0,
    successRate: 0,
    psnr: 0,
    accuracy: 0, // Added accuracy field
    accuracyCount: 0, // To track number of accuracy measurements for averaging
    totalAccuracy: 0 // To accumulate accuracy values
};

// Endpoint to receive metrics (updated to include accuracy)
app.post("/api/metrics", (req, res) => {
    console.log("Received metrics payload:", req.body);
    const { processedImages, successfulImages, avgProcessingTime, psnr, accuracy } = req.body;

    // Validate inputs
    if (
        typeof processedImages !== "number" ||
        typeof successfulImages !== "number" ||
        typeof avgProcessingTime !== "number" ||
        typeof psnr !== "number" ||
        typeof accuracy !== "number"
    ) {
        return res.status(400).json({ message: "Invalid input: All fields must be numbers" });
    }

    // Update stats
    systemStats.processedImages += processedImages;
    systemStats.successfulImages += successfulImages;

    // Compute cumulative success rate
    if (systemStats.processedImages > 0) {
        systemStats.successRate = (systemStats.successfulImages / systemStats.processedImages) * 100;
    } else {
        systemStats.successRate = 0;
    }

    // Compute new average processing time
    systemStats.avgProcessingTime = (systemStats.avgProcessingTime + avgProcessingTime) / 2;
    systemStats.psnr = psnr;

    // Update accuracy (calculate running average)
    if (accuracy) {
        systemStats.accuracyCount += 1;
        systemStats.totalAccuracy += accuracy;
        systemStats.accuracy = systemStats.totalAccuracy / systemStats.accuracyCount;
    }

    console.log("Updated system stats:", systemStats);

    // Broadcast updated stats to all clients
    wss.broadcast(JSON.stringify({ type: "stats", data: systemStats }));

    res.status(200).json({ message: "Metrics received" });
});

// Register endpoint
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Endpoint to fetch system stats
app.get("/api/system-stats", (req, res) => {
    console.log("Sending system stats:", systemStats);
    res.status(200).json(systemStats);
});

// Endpoint to fetch processing history
app.get("/api/processing-history", (req, res) => {
    res.status(200).json([
        { date: "2023-10-01", count: 5 },
        { date: "2023-10-02", count: 10 },
    ]);
});

// Endpoint to fetch performance metrics
app.get("/api/performance-metrics", (req, res) => {
    res.status(200).json({
        psnr: systemStats.psnr,
        accuracy: systemStats.accuracy
    });
});

// Endpoint to fetch recent activity
app.get("/api/recent-activity", (req, res) => {
    res.status(200).json([
        { description: "Image processed", timestamp: "2023-10-01 12:00:00" },
        { description: "Image uploaded", timestamp: "2023-10-01 12:05:00" },
    ]);
});

// Add image upload routes
const imageRoutes = require("./src/routes/imageRoutes")(wss);
app.use("/api/image", imageRoutes);

// Serve Frontend Build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
