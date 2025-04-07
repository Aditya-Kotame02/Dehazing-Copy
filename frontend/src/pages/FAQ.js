import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Code, Cpu, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = [
  {
    name: "General",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        question: "What is the AI-ML De-Hazing/De-Smoking Algorithm?",
        answer: "Our project is an advanced computer vision system that uses deep learning to automatically remove haze, smoke, fog, and other atmospheric distortions from digital images, significantly improving visibility and image quality."
      },
      {
        question: "Who developed this project?",
        answer: "This project was developed by final year Computer Engineering students at KJCOEMR under the guidance of Dr. Aparna Hambarde. The team includes Aditya Kotame (Backend), Vrushali Khade (ML), Samruddhi Latore (Frontend), and Vaishnavi Jedhe (Research)."
      },
      {
        question: "Is this project open source?",
        answer: "Currently the core implementation is proprietary, but we plan to open source certain components in the future. The research paper is publicly available."
      }
    ]
  },
  {
    name: "Technical",
    icon: <Code className="h-5 w-5" />,
    questions: [
      {
        question: "What technologies are used in this project?",
        answer: "We use Python with TensorFlow/PyTorch for the deep learning models, React for the frontend, and Flask for the backend API. Key algorithms include modified U-Net architectures with attention mechanisms and physical scattering models."
      },
      {
        question: "What makes your approach different?",
        answer: "Our hybrid approach combines physical atmospheric scattering models with deep learning, achieving better generalization across different haze/smoke conditions compared to pure data-driven methods."
      },
      {
        question: "What hardware is required to run this?",
        answer: "The web interface works on any modern browser. For optimal performance, we recommend systems with NVIDIA GPUs (8GB+ VRAM) for processing high-resolution images (>4MP)."
      }
    ]
  },
  {
    name: "Applications",
    icon: <Cpu className="h-5 w-5" />,
    questions: [
      {
        question: "What are the practical applications?",
        answer: "Our technology can enhance: 1) Surveillance footage 2) Autonomous vehicle perception 3) Aerial/satellite imagery 4) Medical imaging 5) Industrial inspection systems."
      },
      {
        question: "Can this process videos in real-time?",
        answer: "Our current implementation focuses on image processing with ~500ms latency per image. We're developing an optimized video pipeline targeting 15-30 FPS for HD video streams."
      },
      {
        question: "Does it work with thermal imaging?",
        answer: "While primarily designed for visible spectrum, our architecture can be adapted for thermal images with appropriate training data."
      }
    ]
  },
  {
    name: "Performance",
    icon: <Image className="h-5 w-5" />,
    questions: [
      {
        question: "What metrics do you use for evaluation?",
        answer: "We evaluate using PSNR (Peak Signal-to-Noise Ratio), SSIM (Structural Similarity), and our custom Visibility Enhancement Score (VES). Our model achieves 28.5 dB PSNR on the SOTS outdoor benchmark."
      },
      {
        question: "How does it handle extreme conditions?",
        answer: "The model performs well with moderate haze/smoke (AOD < 2.0). For extreme conditions, we recommend multi-frame approaches or sensor fusion where available."
      },
      {
        question: "What are the limitations?",
        answer: "1) Performance degrades with motion blur 2) Color artifacts may occur with heavy pollution 3) Requires minimum 256x256 resolution 4) Challenging with dense smoke from fires"
      }
    ]
  }
];

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState({});
  const [activeCategory, setActiveCategory] = useState("General");

  const toggleFAQ = (category, index) => {
    setOpenIndices(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }));
  };

  const activeQuestions = faqCategories.find(cat => cat.name === activeCategory)?.questions || [];

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about our De-Hazing and De-Smoking Technology
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {faqCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.name 
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeQuestions.map((faq, index) => (
          <div
            key={index}
            className="p-5 border rounded-xl bg-gray-50 shadow-sm cursor-pointer hover:shadow-md transition duration-200"
            onClick={() => toggleFAQ(activeCategory, index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <HelpCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              </div>
              {openIndices[`${activeCategory}-${index}`] ? (
                <ChevronUp className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              )}
            </div>
            <AnimatePresence>
              {openIndices[`${activeCategory}-${index}`] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pl-8 text-gray-600">
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-3 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Our team would be happy to help.
          </p>
          <button
            onClick={() => window.location.href = 'mailto:adityakotame17@gmail.com'}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
}