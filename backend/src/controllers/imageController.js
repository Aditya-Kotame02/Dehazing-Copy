const path = require("path");
const { runPythonScript } = require("../utils/runPythonProcess");

exports.processImage = async (req) => {
    try {
        if (!req.file) {
            throw new Error("No image uploaded");
        }

        // Define file paths
        const imagePath = path.join(__dirname, "../../uploads", req.file.filename);
        const outputImagePath = path.join(__dirname, "../../uploads", "dehazed_" + req.file.filename);
        const transmissionPath = path.join(__dirname, "../../uploads", "transmission_" + req.file.filename);

        console.log("Processing image:", imagePath); // Debugging log

        // Run Python script for dehazing
        const result = await runPythonScript(imagePath, outputImagePath, transmissionPath);

        if (!result) {
            throw new Error("Image processing failed: Python script returned no result");
        }

        console.log("Image processed successfully:", outputImagePath); // Debugging log

        // ✅ Return data instead of sending response directly
        return {
            message: "Image processed successfully",
            dehazedImage: `/uploads/dehazed_${req.file.filename}`,
            transmissionMap: `/uploads/transmission_${req.file.filename}`,
        };

    } catch (error) {
        console.error("❌ Image processing failed:", error.stack);
        throw error; // Throw error so that it can be handled in routes
    }
};
