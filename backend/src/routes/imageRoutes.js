const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { processImage } = require("../controllers/imageController");

module.exports = (wss) => {
    const router = express.Router();

    // Ensure 'uploads' directory exists
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Storage setup
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadPath),
        filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg, .jpeg, .png files are allowed!"), false);
        }
    };

    const upload = multer({ storage, fileFilter });

    // Upload route
    router.post("/upload", upload.single("image"), async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // Process image and get the result
            const result = await processImage(req);
            
            // Send response after processImage completes
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

    // Global error handler
    router.use((err, req, res, next) => {
        console.error("Upload Error:", err.message);
        if (res.headersSent) return;
        res.status(500).json({ message: err.message || "Internal Server Error" });
    });

    return router;
};
