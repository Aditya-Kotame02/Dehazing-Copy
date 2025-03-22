const { spawn } = require("child_process");
const path = require("path");

// Use the full Python path
const pythonPath = "C:\\Users\\Aditya Kotame\\AppData\\Local\\Programs\\Python\\Python312\\python.exe";

// Use the full path to the Python script
const pythonScriptPath = path.join(__dirname, "../../python/dehaze.py");

exports.runPythonScript = (imagePath, outputImagePath, transmissionPath) => {
    return new Promise((resolve, reject) => {
        console.log("Running Python script with the following arguments:");
        console.log("Image Path:", imagePath);
        console.log("Output Image Path:", outputImagePath);
        console.log("Transmission Path:", transmissionPath);

        const python = spawn(pythonPath, [pythonScriptPath, imagePath, outputImagePath, transmissionPath]);

        python.stdout.on("data", (data) => {
            console.log("Python Output:", data.toString());
        });

        python.stderr.on("data", (data) => {
            console.error("Python Error:", data.toString());
        });

        python.on("close", (code) => {
            if (code === 0) {
                console.log("Python script completed successfully");
                resolve("Processing successful");
            } else {
                console.error("Python script failed with code:", code);
                reject(`Processing failed with code ${code}`);
            }
        });

        python.on("error", (err) => {
            console.error("Failed to start Python process:", err);
            reject(`Failed to start Python process: ${err.message}`);
        });
    });
};