"use client";
import React, { useEffect, useState } from "react";
import PortfolioModal from "@/components/common/portfolioModal";
import { IPortfolio } from "@/types/interfaces/IFreelancer";
import {
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaDollarSign,
  FaMapMarkerAlt,
  FaAward,
  FaFolder,
  FaStar,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { clientActionApi } from "@/api/action/ClientActionApi";

const FreelancerProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const params = useParams();
  const freelancerId = params.freelancerId;
  // Sample data matching the schema
  const [freelancer] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    email: "sarah.johnson@example.com",
    phone: 1234567890,
    address: {
      city: "San Francisco",
      state: "CA",
      country: "United States",
    },
    freelancerProfile: {
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
      professionalRole: "Senior Full Stack Developer",
      bio: "Experienced full-stack developer with 8+ years of expertise in building scalable web applications. Specialized in React, Node.js, and cloud architecture. Passionate about creating clean, efficient code and delivering exceptional user experiences.",
      hourlyRate: 85,
      workCategory: { name: "Web Development" },
      specialties: [
        { name: "Frontend Development" },
        { name: "Backend Development" },
        { name: "API Design" },
      ],
      skills: [
        { name: "React" },
        { name: "Node.js" },
        { name: "TypeScript" },
        { name: "MongoDB" },
        { name: "AWS" },
        { name: "Docker" },
      ],
      languages: [
        { name: "English", proficiency: "Fluent" },
        { name: "Spanish", proficiency: "Conversational" },
      ],
      experiences: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc",
          location: "San Francisco",
          country: "United States",
          isCurrentRole: true,
          startMonth: "January",
          startYear: 2020,
        },
        {
          title: "Full Stack Developer",
          company: "Digital Innovations",
          location: "Remote",
          country: "United States",
          isCurrentRole: false,
          startMonth: "March",
          startYear: 2017,
          endMonth: "December",
          endYear: 2019,
        },
      ],
      education: [
        {
          school: "Stanford University",
          degree: "Master of Science",
          fieldOfStudy: "Computer Science",
          startYear: 2015,
          endYear: 2017,
        },
        {
          school: "UC Berkeley",
          degree: "Bachelor of Science",
          fieldOfStudy: "Software Engineering",
          startYear: 2011,
          endYear: 2015,
        },
      ],
      portfolio: [
        {
          title: "E-Commerce Platform",
          description:
            "Built a full-stack e-commerce solution with React and Node.js",
          image:
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
          link: "#",
        },
        {
          title: "Mobile Banking App",
          description:
            "Developed a secure mobile banking application with real-time features",
          image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
          link: "#",
        },
        {
          title: "Analytics Dashboard",
          description:
            "Created an interactive analytics dashboard with data visualization",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          link: "#",
        },
      ],
    },
  });

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<IPortfolio | null>(
    null
  );

  useEffect(() => {
    async function fetchFreelancerDetail() {
      const response = await clientActionApi.getFreelancerDetail(
        freelancerId as string
      );
      console.log(response)
    }

    fetchFreelancerDetail()
  }, []);
  function handleOpenPortfolioModalFromItem(item: any, idx: number) {
    // Build a demo IPortfolio object from the lightweight item shape
    const demo: IPortfolio = {
      id: item.id || `demo-${idx}`,
      title: item.title || "Untitled Project",
      description: item.description || "",
      technologies:
        (item.technologies as any) || (item.tech ? [item.tech] : []),
      role: item.role || "Contributor",
      projectUrl: item.link || "",
      githubUrl: item.githubUrl || "",
      images: item.images || (item.image ? [item.image] : []),
      video: item.video || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as IPortfolio;

    setSelectedPortfolio(demo);
    setIsPortfolioModalOpen(true);
  }

  return (
    <div className="min-h-screen ">
      {selectedPortfolio && (
        <PortfolioModal
          portfolio={selectedPortfolio}
          isOpen={isPortfolioModalOpen}
          onClose={() => setIsPortfolioModalOpen(false)}
          // no onDelete passed here (client view) — can be provided if allowed
        />
      )}
      {/* Header Section with Tabs - Professional and Clean */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mx-6 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex gap-6">
              <img
                src={freelancer.avatar}
                alt={`${freelancer.firstName} ${freelancer.lastName}`}
                className="w-28 h-28 rounded-lg shadow-md bg-gray-100"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {freelancer.firstName} {freelancer.lastName}
                </h1>
                <p className="text-xl text-gray-700 mb-2">
                  {freelancer.freelancerProfile.professionalRole}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#108A00] font-medium mb-3">
                  <FaBriefcase size={14} />
                  <span>{freelancer.freelancerProfile.workCategory.name}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={14} className="text-gray-400" />
                    <span>
                      {freelancer.address.city}, {freelancer.address.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign size={14} className="text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      ${freelancer.freelancerProfile.hourlyRate}/hr
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar size={14} className="text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-400">(127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:ml-auto">
              <button className="bg-[#108A00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0d7000] transition-colors shadow-sm">
                Hire Now
              </button>
              <button className="border-2 border-[#108A00] text-[#108A00] px-8 py-3 rounded-lg font-semibold hover:bg-[#108A00] hover:text-white transition-colors">
                <FaEnvelope className="inline mr-2" size={16} />
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-2 font-semibold transition-colors border-b-3 ${
                  activeTab === "overview"
                    ? "text-[#108A00] border-b-4 border-[#108A00]"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`py-4 px-2 font-semibold transition-colors border-b-3 ${
                  activeTab === "portfolio"
                    ? "text-[#108A00] border-b-4 border-[#108A00]"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-6 py-8">
        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {freelancer.freelancerProfile.bio}
                </p>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaBriefcase className="text-[#108A00]" size={22} />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {freelancer.freelancerProfile.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#108A00] border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-[#108A00] font-medium">
                            {exp.company}
                          </p>
                        </div>
                        {exp.isCurrentRole && (
                          <span className="bg-[#108A00] text-white text-xs px-3 py-1 rounded-full font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <FaMapMarkerAlt
                          className="inline mr-1 text-gray-400"
                          size={12}
                        />
                        {exp.location}, {exp.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exp.startMonth} {exp.startYear} -{" "}
                        {exp.isCurrentRole
                          ? "Present"
                          : `${exp.endMonth} ${exp.endYear}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaGraduationCap className="text-[#108A00]" size={24} />
                  Education
                </h2>
                <div className="space-y-6">
                  {freelancer.freelancerProfile.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#108A00] border-2 border-white"></div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-[#108A00] font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.fieldOfStudy}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaAward className="text-[#108A00]" size={20} />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.freelancerProfile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-[#108A00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d7000] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Specialties
                </h2>
                <div className="space-y-2">
                  {freelancer.freelancerProfile.specialties.map(
                    (specialty, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <p className="text-gray-800 font-medium">
                          {specialty.name}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Languages Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaGlobe className="text-[#108A00]" size={20} />
                  Languages
                </h2>
                <div className="space-y-3">
                  {freelancer.freelancerProfile.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-800 font-medium">
                        {lang.name}
                      </span>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Portfolio Tab Content */
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FaFolder className="text-[#108A00]" size={22} />
                Portfolio
              </h2>
              <p className="text-gray-600">
                Showcasing my best work and projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancer.freelancerProfile.portfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => handleOpenPortfolioModalFromItem(item, idx)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      onClick={(e) => e.preventDefault()}
                      className="inline-block bg-[#108A00] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d7000] transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {freelancer.freelancerProfile.portfolio.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                <FaFolder size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No portfolio items yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
