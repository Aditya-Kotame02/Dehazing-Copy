import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Loader2, Image, Sparkles, Layers, Download } from "lucide-react";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dehazedImage, setDehazedImage] = useState(null);
    const [transmissionMap, setTransmissionMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.match("image.*")) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
            }
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
                        AI-Powered Image Dehazing
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload your hazy or smoky image and let our AI algorithm restore clarity and visibility
                    </p>
                </div>

                <div 
                    className={`relative border-2 border-dashed rounded-xl p-8 mb-8 transition-all ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Upload className="h-12 w-12 text-indigo-500" />
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">
                                {preview ? "Image selected" : dragActive ? "Drop your image here" : "Drag & drop your image here"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                or click to browse files (JPG, PNG supported)
                            </p>
                        </div>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {preview && (
                            <div className="mt-4 relative group">
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="h-48 object-contain rounded-lg shadow-sm border border-gray-200 group-hover:shadow-md transition"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Image className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mb-12">
                    <button
                        onClick={handleUpload}
                        disabled={loading || !selectedFile}
                        className={`flex items-center justify-center px-8 py-3 rounded-xl text-lg font-medium text-white shadow-lg transition-all ${
                            loading 
                                ? "bg-indigo-400 cursor-not-allowed" 
                                : !selectedFile 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl"
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                Enhance Image
                            </>
                        )}
                    </button>
                </div>

                {dehazedImage && transmissionMap && (
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Enhanced Results</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Original Image */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-4 bg-gray-100 px-4 py-2 rounded-full">
                                    <Image className="h-5 w-5 text-gray-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-700">Original Image</h3>
                                </div>
                                <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200">
                                    <img 
                                        src={preview} 
                                        alt="Original" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Dehazed Result */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-4 bg-blue-100 px-4 py-2 rounded-full">
                                    <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-blue-700">Dehazed Result</h3>
                                </div>
                                <div className="w-full h-96 flex items-center justify-center bg-blue-50 rounded-lg p-2 border border-blue-200">
                                    <img 
                                        src={dehazedImage} 
                                        alt="Dehazed" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="mt-4 flex space-x-3">
                                    <a 
                                        href={dehazedImage} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Image className="h-4 w-4 mr-2" />
                                        View Full Size
                                    </a>
                                    <a 
                                        href={dehazedImage} 
                                        download 
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </a>
                                </div>
                            </div>

                            {/* Transmission Map */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-4 bg-indigo-100 px-4 py-2 rounded-full">
                                    <Layers className="h-5 w-5 text-indigo-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-indigo-700">Transmission Map</h3>
                                </div>
                                <div className="w-full h-96 flex items-center justify-center bg-indigo-50 rounded-lg p-2 border border-indigo-200">
                                    <img 
                                        src={transmissionMap} 
                                        alt="Transmission Map" 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">How Our Dehazing Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <div className="text-blue-600 font-bold text-xl mb-3 flex items-center">
                                <span className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">1</span>
                                Image Analysis
                            </div>
                            <p className="text-gray-600">Our system first analyzes the image to estimate the atmospheric light and depth information.</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <div className="text-blue-600 font-bold text-xl mb-3 flex items-center">
                                <span className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">2</span>
                                Transmission Estimation
                            </div>
                            <p className="text-gray-600">We calculate the transmission map showing how much light is scattered at each pixel.</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <div className="text-blue-600 font-bold text-xl mb-3 flex items-center">
                                <span className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">3</span>
                                Image Restoration
                            </div>
                            <p className="text-gray-600">Using deep learning, we reconstruct the scene radiance to produce a clear, haze-free image.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;