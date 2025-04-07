import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Cpu, Image, Check, Shield, Cloud, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const featureIcons = {
  "Fast Processing": <Zap className="h-8 w-8 text-blue-600" />,
  "High Accuracy": <Check className="h-8 w-8 text-green-600" />,
  "Easy to Use": <Upload className="h-8 w-8 text-purple-600" />,
  "Secure & Private": <Shield className="h-8 w-8 text-indigo-600" />,
  "Cloud-Based": <Cloud className="h-8 w-8 text-sky-600" />,
  "Free to Try": <Cpu className="h-8 w-8 text-orange-600" />
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { 
      step: "1. Image Upload", 
      description: "Upload your hazy or smoke-affected images through our intuitive drag-and-drop interface or traditional file selection.",
      icon: <Upload className="h-10 w-10 text-blue-500" />
    },
    { 
      step: "2. AI Processing", 
      description: "Our advanced deep learning model analyzes and removes haze/smoke while preserving image details using a hybrid CNN-Transformer architecture.",
      icon: <Cpu className="h-10 w-10 text-purple-500" />
    },
    { 
      step: "3. Enhanced Results", 
      description: "Download your crystal-clear image along with the transmission map showing the atmospheric scattering analysis.",
      icon: <Image className="h-10 w-10 text-green-500" />
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center bg-gradient-to-br from-blue-50 to-purple-50 py-24 rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              AI-Powered
            </span> Image Enhancement
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transform hazy, smoky, or foggy images into crystal clear visuals using our state-of-the-art deep learning algorithms.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }} 
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center"
          >
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-2"
          >
            How Our Technology Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-center text-gray-500 max-w-3xl mx-auto mb-12"
          >
            Our three-step process makes image enhancement simple and effective
          </motion.p>
          
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 cursor-pointer rounded-xl transition-all ${activeStep === index ? 'bg-gradient-to-br from-blue-50 to-purple-50 scale-[1.02] shadow-md border border-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-white rounded-xl shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">{item.step}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Why Choose Our Solution?</h2>
          <p className="text-lg text-center text-gray-500 mb-12">Advanced technology meets user-friendly experience</p>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(featureIcons).map(([feature, icon], index) => (
              <motion.div 
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto bg-blue-50 rounded-lg">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900">{feature}</h3>
                <p className="mt-2 text-gray-600 text-center text-sm">
                  {feature === "Fast Processing" && "Process images in under 30 seconds with our optimized algorithms"}
                  {feature === "High Accuracy" && "95.2% PSNR accuracy on benchmark datasets"}
                  {feature === "Easy to Use" && "Intuitive interface requiring no technical expertise"}
                  {feature === "Secure & Private" && "Your images are processed securely and never stored permanently"}
                  {feature === "Cloud-Based" && "Access from anywhere without heavy hardware requirements"}
                  {feature === "Free to Try" && "Test our technology with no commitment required"}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call-to-Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative text-center bg-gradient-to-br from-blue-600 to-purple-600 py-16 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Enhance Your Images?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience professional-grade image enhancement powered by AI
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Start Processing Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}