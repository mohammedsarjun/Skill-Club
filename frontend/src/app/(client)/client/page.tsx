"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  FaPlus, // Plus
  FaBriefcase, // Briefcase
  FaFileAlt, // FileText
  FaDollarSign, // DollarSign
  FaClock, // Clock
  FaChevronLeft, // ChevronLeft
  FaChevronRight, // ChevronRight
  FaBell, // Bell
  FaEnvelope, // Mail
} from "react-icons/fa";

function ClientDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router=useRouter()
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";
  const clientName = "John Anderson";

  const stats = [
    { label: "Active Jobs", value: "12", icon: FaPlus, color: "bg-emerald-50" },
    { label: "Posted Jobs", value: "28", icon: FaFileAlt, color: "bg-blue-50" },
    {
      label: "Total Spend",
      value: "$45,280",
      icon: FaDollarSign,
      color: "bg-purple-50",
    },
    {
      label: "Applications Pending",
      value: "34",
      icon: FaClock,
      color: "bg-orange-50",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      budget: "$5,000 - $8,000",
      proposals: 24,
      postedDate: "2 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile App",
      budget: "$3,000 - $5,000",
      proposals: 18,
      postedDate: "5 days ago",
      status: "Active",
    },
    {
      id: 3,
      title: "Full Stack Developer - E-commerce",
      budget: "$8,000 - $12,000",
      proposals: 32,
      postedDate: "1 week ago",
      status: "Active",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      budget: "$6,000 - $9,000",
      proposals: 15,
      postedDate: "1 week ago",
      status: "Active",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "New proposal received for React Developer position",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      message: "Interview scheduled with Sarah Johnson",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Project milestone completed by Mike Chen",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      message: "Payment processed successfully",
      time: "5 hours ago",
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Emily Rodriguez",
      message: "Thank you for accepting my proposal. When can we start?",
      time: "2 min ago",
      unread: true,
      avatar: "ER",
    },
    {
      id: 2,
      sender: "David Kim",
      message: "I have a question about the project requirements",
      time: "1 hour ago",
      unread: true,
      avatar: "DK",
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      message: "The wireframes are ready for your review",
      time: "3 hours ago",
      unread: false,
      avatar: "SW",
    },
    {
      id: 4,
      sender: "James Taylor",
      message: "Can we schedule a call to discuss the timeline?",
      time: "5 hours ago",
      unread: false,
      avatar: "JT",
    },
  ];

  const jobsPerPage = 2;
  const totalSlides = Math.ceil(recentJobs.length / jobsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleJobs = recentJobs.slice(
    currentSlide * jobsPerPage,
    (currentSlide + 1) * jobsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              {greeting}, {clientName}
            </h1>
            <p className="text-gray-500">Welcome back to your dashboard</p>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            style={{ backgroundColor: "#108A00" }}
            onClick={()=>router.push("/client/jobs/create")}
          >
            <FaPlus className="w-5 h-5" />
            Post Job
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6" style={{ color: "#108A00" }} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide === 0}
              >
                <FaChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide === totalSlides - 1}
              >
                <FaChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="border-2 border-gray-100 rounded-xl p-6 hover:border-opacity-50 transition-all duration-300 hover:shadow-md"
                style={{
                  borderColor: currentSlide === 0 ? "#108A0020" : undefined,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {job.title}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "#108A00" }}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 font-medium">{job.budget}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {job.proposals} proposals
                  </span>
                  <span className="text-gray-400">Posted {job.postedDate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-8" : "w-2"
                }`}
                style={{
                  backgroundColor:
                    currentSlide === index ? "#108A00" : "#E5E7EB",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#108A0015" }}
              >
                <FaBell className="w-6 h-6" style={{ color: "#108A00" }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Notifications
              </h2>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md ${
                    notification.unread ? "bg-gray-50" : "bg-white"
                  }`}
                  style={{
                    borderLeftColor: notification.unread
                      ? "#108A00"
                      : "#E5E7EB",
                  }}
                >
                  <p
                    className={`text-sm mb-1 ${
                      notification.unread
                        ? "font-semibold text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#108A0015" }}
              >
                <FaEnvelope className="w-6 h-6" style={{ color: "#108A00" }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Messages
              </h2>
            </div>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-xl flex items-start gap-4 transition-all duration-200 hover:shadow-md ${
                    message.unread
                      ? "bg-gray-50"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: "#108A00" }}
                  >
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={`font-semibold text-sm ${
                          message.unread ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {message.sender}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {message.time}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        message.unread ? "text-gray-700" : "text-gray-500"
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
