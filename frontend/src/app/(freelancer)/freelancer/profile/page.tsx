import React from 'react';
import { 
  FaEdit, 
  FaPlus, 
  FaMapMarkerAlt, 
  FaUser, 
  FaDollarSign, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaFileAlt, 
  FaHistory 
} from "react-icons/fa";

function FreelancerProfilePage() {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB'];
  const languages = ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" ">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              
              {/* Name and Location */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sarah Mitchell</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                  <span className="text-lg">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Languages Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {languages.map((language, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">{language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaGraduationCap className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">Bachelor of Computer Science</h4>
                  <p className="text-gray-600 mt-1">Stanford University</p>
                  <p className="text-sm text-gray-500 mt-1">2018 - 2022</p>
                </div>
                <div className="border-l-4 border-green-300 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">Full Stack Development Bootcamp</h4>
                  <p className="text-gray-600 mt-1">General Assembly</p>
                  <p className="text-sm text-gray-500 mt-1">2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Role and Hourly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaBriefcase className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Role</h3>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xl font-medium text-green-600">Full Stack Developer</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Hourly Rate</h3>
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xl font-medium text-green-600">$85/hour</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaFileAlt className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Experienced full stack developer with 5+ years of expertise in modern web technologies. 
                Specialized in building scalable applications using React, Node.js, and cloud platforms. 
                Passionate about creating clean, efficient code and delivering exceptional user experiences. 
                Strong background in both frontend and backend development with a focus on performance optimization.
              </p>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center">
                    <FaCode className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">E-commerce Platform</h4>
                  <p className="text-sm text-gray-600 mt-1">React, Node.js, MongoDB</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center">
                    <FaCode className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Task Management App</h4>
                  <p className="text-sm text-gray-600 mt-1">Vue.js, Express, PostgreSQL</p>
                </div>
              </div>
            </div>

            {/* Work History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaHistory className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Work History</h3>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaBriefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Senior Full Stack Developer</h4>
                    <p className="text-green-600 font-medium">TechCorp Solutions</p>
                    <p className="text-sm text-gray-500 mb-2">2022 - Present</p>
                    <p className="text-gray-700 text-sm">Led development of multiple client projects, mentored junior developers, and implemented best practices for code quality.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaBriefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Frontend Developer</h4>
                    <p className="text-blue-600 font-medium">StartupXYZ</p>
                    <p className="text-sm text-gray-500 mb-2">2020 - 2022</p>
                    <p className="text-gray-700 text-sm">Developed responsive web applications using React and collaborated with design team to implement pixel-perfect UIs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfilePage;
