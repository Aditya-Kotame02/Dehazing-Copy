const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const upload = multer();

router.post("/dehaze", upload.single("image"), async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/dehaze", req.file.buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
      responseType: "json",
    });

    res.send(response.data);
  } catch (error) {
    console.error("Dehazing API error:", error.message);
    res.status(500).json({ error: "Failed to dehaze image" });
  }
});

module.exports = router;
