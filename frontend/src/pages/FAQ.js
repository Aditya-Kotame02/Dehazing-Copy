import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "What is the purpose of this project?", answer: "Our AI-ML based system removes haze and smoke from images using deep learning techniques." },
  { question: "What technologies are used?", answer: "We use Python, TensorFlow, and deep learning models like U-Net and GANs." },
  { question: "Can this system process videos?", answer: "Currently, our model is optimized for images, but we are working on real-time video enhancement." },
  { question: "Who developed this project?", answer: "This project is developed by a final-year engineering team focusing on AI-ML research." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-center text-indigo-600 text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="text-center text-gray-500 mt-2">Find answers to common queries about our project.</p>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-5 border rounded-lg bg-gray-50 shadow-sm cursor-pointer hover:shadow-md transition duration-200"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              </div>
              {openIndex === index ? <ChevronUp className="h-5 w-5 text-indigo-600" /> : <ChevronDown className="h-5 w-5 text-indigo-600" />}
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
