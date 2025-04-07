// import { Users, GraduationCap, BookOpen, ShieldCheck } from "lucide-react";

// export default function About() {
//   const teamMembers = [
//     {
//       name: "Dr. Aparna Hambarde",
//       role: "Project Guide",
//       email: "aparnahamabarde.kjcoemr@kjei.edu.in",
//       description: "Professor at KJCOEMR with expertise in AI/ML and Computer Vision"
//     },
//     {
//       name: "Aditya Kotame",
//       role: "Backend Developer",
//       email: "adityakotame17@gmail.com",
//       description: "Specialized in algorithm implementation and system architecture"
//     },
//     {
//       name: "Vrushali Khade",
//       role: "ML Engineer",
//       email: "Khadevrushali2003@gmail.com",
//       description: "Focused on deep learning models and data preprocessing"
//     },
//     {
//       name: "Samruddhi Latore",
//       role: "Frontend Developer",
//       email: "Samruddhilatore17@gmail.com",
//       description: "Designed intuitive user interfaces and visualization tools"
//     },
//     {
//       name: "Vaishnavi Jedhe",
//       role: "Research & Testing",
//       email: "vaishnavijedhe777@gmail.com",
//       description: "Conducted comparative analysis and performance evaluation"
//     }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-gray-200">
//       <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//         About Our Project
//       </h1>
//       <p className="text-center text-gray-600 mt-4 text-lg">
//         AI-ML based Intelligent De-Hazing and De-Smoking Algorithm
//       </p>
//       <p className="text-center text-gray-700 mt-2 max-w-3xl mx-auto">
//         Final Year BE Computer Engineering Project at KJ College of Engineering and Management Research
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//         {[
//           { 
//             icon: <GraduationCap className="h-16 w-16 text-blue-600" />, 
//             title: "Academic Project", 
//             description: "Developed as part of our Bachelor's degree requirements, combining theoretical knowledge with practical implementation." 
//           },
//           { 
//             icon: <BookOpen className="h-16 w-16 text-purple-600" />, 
//             title: "Research Paper", 
//             description: "Published in IJRASET (ISSN: 2321-9653) detailing our novel approach to image enhancement." 
//           },
//           { 
//             icon: <ShieldCheck className="h-16 w-16 text-indigo-600" />, 
//             title: "Practical Applications", 
//             description: "Enhances visibility in surveillance, autonomous vehicles, and environmental monitoring systems." 
//           }
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="card flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
//           >
//             <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full">
//               {item.icon}
//             </div>
//             <h3 className="mt-6 text-xl font-bold text-gray-800">{item.title}</h3>
//             <p className="mt-2 text-gray-600 text-center text-sm leading-relaxed">
//               {item.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-16">
//         <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
//           Our Team
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {teamMembers.map((member, index) => (
//             <div 
//               key={index}
//               className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//             >
//               <div className="text-center">
//                 <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
//                   <Users className="h-10 w-10 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
//                 <p className="text-purple-600 font-medium">{member.role}</p>
//                 <p className="text-gray-600 text-sm mt-2">{member.description}</p>
//                 <a 
//                   href={`mailto:${member.email}`}
//                   className="text-blue-500 text-xs mt-3 inline-block hover:text-blue-700"
//                 >
//                   {member.email}
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Project Highlights
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h3 className="font-semibold text-lg text-blue-700 mb-2">Technical Approach</h3>
//             <ul className="list-disc pl-5 text-gray-700 space-y-1">
//               <li>Hybrid CNN-Transformer architecture</li>
//               <li>Physical scattering model integration</li>
//               <li>Adaptive contrast enhancement</li>
//               <li>Real-time processing optimization</li>
//             </ul>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h3 className="font-semibold text-lg text-purple-700 mb-2">Key Achievements</h3>
//             <ul className="list-disc pl-5 text-gray-700 space-y-1">
//               <li>Published research paper in peer-reviewed journal</li>
//               <li>95.2% accuracy on benchmark datasets</li>
//               <li>40% faster processing than existing solutions</li>
//               <li>Patent application in process</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="text-center mt-12 space-x-4">
//         <button
//           className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
//           onClick={() => window.location.href = 'https://www.ijraset.com/research-paper/ai-ml-based-intelligent-de-smoking-de-hazing-algorithm'}
//         >
//           View Research Paper
//         </button>
//         <button
//           className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105"
//           onClick={() => window.location.href = 'https://github.com/your-repo-link'}
//         >
//           GitHub Repository
//         </button>
//       </div>
//     </div>
//   );
// }

import { Users, GraduationCap, BookOpen, ShieldCheck } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Aparna Hambarde",
      role: "Project Guide",
      description: "Professor at KJCOEMR with expertise in AI/ML and Computer Vision"
    },
    {
      name: "Aditya Kotame",
      role: "Backend Developer",
      description: "Specialized in algorithm implementation and system architecture"
    },
    {
      name: "Vrushali Khade",
      role: "ML Engineer",
      description: "Focused on deep learning models and data preprocessing"
    },
    {
      name: "Samruddhi Latore",
      role: "Frontend Developer",
      description: "Designed intuitive user interfaces and visualization tools"
    },
    {
      name: "Vaishnavi Jedhe",
      role: "Research & Testing",
      description: "Conducted comparative analysis and performance evaluation"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-gray-200">
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        About Our Project
      </h1>
      <p className="text-center text-gray-600 mt-4 text-lg">
        AI-ML based Intelligent De-Hazing and De-Smoking Algorithm
      </p>
      <p className="text-center text-gray-700 mt-2 max-w-3xl mx-auto">
        Final Year BE Computer Engineering Project at KJ College of Engineering and Management Research
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { 
            icon: <GraduationCap className="h-16 w-16 text-blue-600" />, 
            title: "Academic Project", 
            description: "Developed as part of our Bachelor's degree requirements, combining theoretical knowledge with practical implementation." 
          },
          { 
            icon: <BookOpen className="h-16 w-16 text-purple-600" />, 
            title: "Research Paper", 
            description: "Published in IJRASET (ISSN: 2321-9653) detailing our novel approach to image enhancement." 
          },
          { 
            icon: <ShieldCheck className="h-16 w-16 text-indigo-600" />, 
            title: "Practical Applications", 
            description: "Enhances visibility in surveillance, autonomous vehicles, and environmental monitoring systems." 
          }
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

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-purple-600 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Project Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-blue-700 mb-2">Technical Approach</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Hybrid CNN-Transformer architecture</li>
              <li>Physical scattering model integration</li>
              <li>Adaptive contrast enhancement</li>
              <li>Real-time processing optimization</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-purple-700 mb-2">Key Achievements</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Published research paper in peer-reviewed journal</li>
              <li>95.2% accuracy on benchmark datasets</li>
              <li>40% faster processing than existing solutions</li>
              <li>Patent application in process</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 space-x-4">
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          onClick={() => window.location.href = 'https://www.ijraset.com/research-paper/ai-ml-based-intelligent-de-smoking-de-hazing-algorithm'}
        >
          View Research Paper
        </button>
        <button
          className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105"
          onClick={() => window.location.href = 'https://github.com/your-repo-link'}
        >
          GitHub Repository
        </button>
      </div>
    </div>
  );
}