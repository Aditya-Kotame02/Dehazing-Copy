import { Users, Code, BrainCircuit } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-gray-200">
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        About Our Project
      </h1>
      <p className="text-center text-gray-600 mt-4 text-lg">
        AI-ML based Intelligent De-Hazing and De-Smoking Algorithm
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { icon: <Users className="h-16 w-16 text-blue-600" />, title: "Team & Research", description: "Our project is developed by a team of final-year students, focused on AI and ML research." },
          { icon: <Code className="h-16 w-16 text-purple-600" />, title: "Technology Used", description: "We leverage deep learning models including U-Net, GANs, and Transformer-based approaches." },
          { icon: <BrainCircuit className="h-16 w-16 text-indigo-600" />, title: "Future Scope", description: "Enhancing real-time video processing for traffic monitoring and security applications." }
        ].map((item, index) => (
          <div
            key={index}
            className="card flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
          >
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full">
              {item.icon}
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600 text-center text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          onClick={() => window.location.href = 'https://www.ijraset.com/research-paper/ai-ml-based-intelligent-de-smoking-de-hazing-algorithm'}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}