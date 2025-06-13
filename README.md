# 🌫️ AI/ML-Based Intelligent Dehazing & Desmoking System

## 🔍 Project Overview

This project presents an AI/ML-powered web platform that performs **real-time image dehazing and desmoking** to restore visual clarity, especially in disaster-affected environments. It integrates **deep learning models** with a cloud-based backend to provide enhanced image quality, vital for disaster response, surveillance, and autonomous systems.

---

## 🚀 Features

- 🔬 AI/ML-based image dehazing using U-Net, FFA-Net, and transformer-based models (DeHAMER)
- 📸 Real-time image restoration with PSNR and accuracy metrics
- 📊 Live dashboard for backend statistics like:
  - Processed Images
  - Successful Images
  - PSNR
  - Accuracy
  - Average Processing Time
  - Success Rate
- 🌐 Web interface with secure login/signup
- ☁️ MongoDB for image storage & MySQL for user management
- 📡 APIs for real-time disaster data aggregation (Twitter, News, etc.)

---

## 📈 System Metrics Monitored

```json
{
  "processedImages": 1,
  "successfulImages": 1,
  "avgProcessingTime": 0.098s,
  "successRate": 100,
  "psnr": 11.12,
  "accuracy": 65.94,
  "accuracyCount": 1,
  "totalAccuracy": 65.94
}

