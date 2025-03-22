import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 py-20 rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          AI-Powered De-Smoking & De-Hazing
        </h1>
        <p className="mt-4 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-6 md:max-w-2xl">
          Transform hazy and smoke-affected images into crystal clear visuals using our advanced AI algorithm.
        </p>
        <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
          <Link
            to="/upload"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { step: "1. Image Upload", description: "Upload your hazy or smoke-affected images through our intuitive interface." },
            { step: "2. AI Processing", description: "Our AI model analyzes and processes your image using advanced algorithms." },
            { step: "3. Results", description: "Download your enhanced image with improved visibility and clarity." }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900">{item.step}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center bg-gradient-to-br from-blue-600 to-purple-600 py-12 rounded-xl">
        <h2 className="text-3xl font-bold text-white">Ready to Transform Your Images?</h2>
        <p className="mt-4 text-lg text-blue-100">
          Experience the power of AI for image enhancement.
        </p>
        <div className="mt-8">
          <Link
            to="/upload"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
