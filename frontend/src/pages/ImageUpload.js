import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dehazedImage, setDehazedImage] = useState(null);
    const [transmissionMap, setTransmissionMap] = useState(null);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/image/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.dehazedImage && response.data.transmissionMap) {
                setDehazedImage(`${BACKEND_URL}${response.data.dehazedImage}`);
                setTransmissionMap(`${BACKEND_URL}${response.data.transmissionMap}`);
            } else {
                alert("Unexpected response from the server.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-#ADD8E6 p-5">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                Upload Image for Dehazing
            </h2>

            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="w-full max-w-md p-3 border border-gray-300 rounded-md mb-5"
            />

            {preview && (
                <div className="mb-5">
                    <img src={preview} alt="Preview" className="w-full max-w-lg object-contain rounded-md" />
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={loading}
                className={`w-full max-w-md py-3 text-white font-medium text-lg rounded-md transition ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {loading ? "Processing..." : "Upload & Process"}
            </button>

            {dehazedImage && transmissionMap && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Original</h3>
                        <img src={preview} alt="Original" className="w-full h-80 object-contain rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Dehazed</h3>
                        <img src={dehazedImage} alt="Dehazed" className="w-full h-80 object-contain rounded-md shadow-md" />
                        <a href={dehazedImage} target="_blank" rel="noopener noreferrer" className="mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                            Open Dehazed Image in New Tab
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Transmission Map</h3>
                        <img src={transmissionMap} alt="Transmission Map" className="w-full h-80 object-contain rounded-md shadow-md" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
