"use client";

import { freelancerActionApi } from "@/api/action/FreelancerActionApi";
import React, { JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  FaHistory,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface Portfolio {
  title: string;
  tech: string;
  color: string;
}

interface WorkHistory {
  title: string;
  company: string;
  period: string;
  description: string;
  color: string;
}

interface ModalData {
  value?: string;
  degree?: string;
  institution?: string;
  period?: string;
  title?: string;
  tech?: string;
  company?: string;
  description?: string;
}

type ModalType =
  | "name"
  | "location"
  | "role"
  | "hourlyRate"
  | "description"
  | "language"
  | "education"
  | "portfolio"
  | "work"
  | "skill"
  | "";

function FreelancerProfilePage(): JSX.Element {
  useEffect(() => {
    async function fetchData() {
      const response = await freelancerActionApi.getFreelancerData();

      if (response.success) {
        setHourlyRate(`${response.data.hourlyRate}/hour`);
        setDescription(response.data.bio);
        setRole(response.data.professionalRole);
        const responseLanguage = response.data.languages.map(
          (lang: any) => `${lang.name} (${lang.proficiency})`
        );
        setLanguages(responseLanguage);
        const responseEducation = response.data.education.map((edu: any) => ({
          degree: `${edu.degree} of ${edu.fieldOfStudy}`,
          institution: edu.school,
          period: `${edu.startYear} - ${edu.endYear}`,
        }));
        setEducation(responseEducation);
        setSkills(response.data.skills);
        setPortfolio(response.data.portfolio);
        const responseWorkHistory = response.data.experiences.map(
          (exp: any) => ({
            title: exp.title,
            company: exp.company,
            period: `${exp.startYear}-${
              exp.isCurrentRole ? "present" : exp.endYear
            }`,
          })
        );
        setWorkHistory(responseWorkHistory);
        setName(response.data.name);
        setLocation(
          `${response.data.address.country},${response.data.address.city}`
        );
        setLogo(response.data.logo);
      } else {
        toast.error(response.message);
      }
    }

    fetchData();
  }, []);

  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "MongoDB",
  ]);
  const [languages, setLanguages] = useState<string[]>([
    "English (Native)",
    "Spanish (Fluent)",
    "French (Intermediate)",
  ]);
  const [name, setName] = useState<string>("Sarah Mitchell");
  const [location, setLocation] = useState<string>("San Francisco, CA");
  const [role, setRole] = useState<string>("Full Stack Developer");
  const [hourlyRate, setHourlyRate] = useState<string>("$85/hour");
  const [description, setDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [education, setEducation] = useState<Education[]>([]);

  const [portfolio, setPortfolio] = useState<Portfolio[] | null>(null);

  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description:
        "Led development of multiple client projects, mentored junior developers, and implemented best practices for code quality.",
      color: "green",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications using React and collaborated with design team to implement pixel-perfect UIs.",
      color: "blue",
    },
  ]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [modalData, setModalData] = useState<ModalData>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openModal = (
    type: ModalType,
    data: ModalData = {},
    index: number | null = null
  ): void => {
    setModalType(type);
    setModalData(data);
    setEditIndex(index);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setModalType("");
    setModalData({});
    setEditIndex(null);
  };

  const handleInputChange = (field: string, value: string): void => {
    setModalData({ ...modalData, [field]: value });
  };

  const handleSave = (): void => {
    switch (modalType) {
      case "name":
        if (modalData.value) setName(modalData.value);
        break;
      case "location":
        if (modalData.value) setLocation(modalData.value);
        break;
      case "role":
        if (modalData.value) setRole(modalData.value);
        break;
      case "hourlyRate":
        if (modalData.value) setHourlyRate(modalData.value);
        break;
      case "description":
        if (modalData.value) setDescription(modalData.value);
        break;
      case "language":
        if (modalData.value) {
          if (editIndex !== null) {
            const updated = [...languages];
            updated[editIndex] = modalData.value;
            setLanguages(updated);
          } else {
            setLanguages([...languages, modalData.value]);
          }
        }
        break;
      case "education":
        if (modalData.degree && modalData.institution && modalData.period) {
          if (editIndex !== null) {
            const updated = [...education];
            updated[editIndex] = {
              degree: modalData.degree,
              institution: modalData.institution,
              period: modalData.period,
            };
            setEducation(updated);
          } else {
            setEducation([
              ...education,
              {
                degree: modalData.degree,
                institution: modalData.institution,
                period: modalData.period,
              },
            ]);
          }
        }
        break;
      case "portfolio":
        if (modalData.title && modalData.tech) {
          if (editIndex !== null) {
            const updated = [...portfolio!];
            updated[editIndex] = {
              ...updated[editIndex],
              title: modalData.title,
              tech: modalData.tech,
            };
            setPortfolio(updated);
          } else {
            const colors: string[] = [
              "green",
              "blue",
              "purple",
              "orange",
              "pink",
            ];
            setPortfolio([
              ...portfolio!,
              {
                title: modalData.title,
                tech: modalData.tech,
                color: colors[Math.floor(Math.random() * colors.length)],
              },
            ]);
          }
        }
        break;
      case "work":
        if (
          modalData.title &&
          modalData.company &&
          modalData.period &&
          modalData.description
        ) {
          if (editIndex !== null) {
            const updated = [...workHistory];
            updated[editIndex] = {
              ...updated[editIndex],
              title: modalData.title,
              company: modalData.company,
              period: modalData.period,
              description: modalData.description,
            };
            setWorkHistory(updated);
          } else {
            const colors: string[] = [
              "green",
              "blue",
              "purple",
              "orange",
              "pink",
            ];
            setWorkHistory([
              ...workHistory,
              {
                title: modalData.title,
                company: modalData.company,
                period: modalData.period,
                description: modalData.description,
                color: colors[Math.floor(Math.random() * colors.length)],
              },
            ]);
          }
        }
        break;
      case "skill":
        if (modalData.value) {
          if (editIndex !== null) {
            const updated = [...skills];
            updated[editIndex] = modalData.value;
            setSkills(updated);
          } else {
            setSkills([...skills, modalData.value]);
          }
        }
        break;
      default:
        break;
    }
    closeModal();
  };

  const getModalTitle = (): string => {
    const typeMap: Record<string, string> = {
      name: "Name",
      location: "Location",
      role: "Role",
      hourlyRate: "Hourly Rate",
      description: "Description",
      language: "Language",
      education: "Education",
      portfolio: "Portfolio",
      work: "Work History",
      skill: "Skill",
    };
    return typeMap[modalType] || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editIndex !== null ? "Edit" : "Add"} {getModalTitle()}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {(modalType === "name" ||
                  modalType === "location" ||
                  modalType === "role" ||
                  modalType === "hourlyRate" ||
                  modalType === "language" ||
                  modalType === "skill") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {modalType === "name" && "Full Name"}
                      {modalType === "location" && "Location"}
                      {modalType === "role" && "Role"}
                      {modalType === "hourlyRate" && "Hourly Rate"}
                      {modalType === "language" && "Language"}
                      {modalType === "skill" && "Skill"}
                    </label>
                    <input
                      type="text"
                      value={modalData.value || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("value", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder={`Enter ${modalType}`}
                    />
                  </div>
                )}

                {modalType === "description" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={modalData.value || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleInputChange("value", e.target.value)
                      }
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                      placeholder="Enter description"
                    />
                  </div>
                )}

                {modalType === "education" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree/Certification
                      </label>
                      <input
                        type="text"
                        value={modalData.degree || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("degree", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., Bachelor of Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={modalData.institution || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("institution", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., Stanford University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Period
                      </label>
                      <input
                        type="text"
                        value={modalData.period || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("period", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., 2018 - 2022"
                      />
                    </div>
                  </>
                )}

                {modalType === "portfolio" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={modalData.title || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technologies
                      </label>
                      <input
                        type="text"
                        value={modalData.tech || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("tech", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., React, Node.js, MongoDB"
                      />
                    </div>
                  </>
                )}

                {modalType === "work" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={modalData.title || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., Senior Full Stack Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={modalData.company || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., TechCorp Solutions"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Period
                      </label>
                      <input
                        type="text"
                        value={modalData.period || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("period", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="e.g., 2022 - Present"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={modalData.description || ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
           {logo ? (
  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
    <Image
      src={logo}
      alt="userLogo"
      width={64}
      height={64}
      className="w-full h-full object-cover"
    />
  </div>
) : (
  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
    <FaUser className="w-8 h-8 text-white" />
  </div>
)}

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                  <button
                    onClick={() => openModal("name", { value: name })}
                    className="text-gray-400 hover:text-green-600"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center text-gray-600 mt-1">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                  <span className="text-lg">{location}</span>
                  <button
                    onClick={() => openModal("location", { value: location })}
                    className="ml-2 text-gray-400 hover:text-green-600"
                  >
                    <FaEdit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Languages
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal("language", { value: "" })}
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {languages.map((language: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">{language}</span>
                    <button
                      onClick={() =>
                        openModal("language", { value: language }, index)
                      }
                      className="text-gray-400 hover:text-green-600"
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaGraduationCap className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      openModal("education", {
                        degree: "",
                        institution: "",
                        period: "",
                      })
                    }
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {education.map((edu: Education, index: number) => (
                  <div
                    key={index}
                    className="border-l-4 border-green-600 pl-4 py-2 relative group"
                  >
                    <button
                      onClick={() => openModal("education", edu, index)}
                      className="absolute -right-2 top-2 text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>
                    <h4 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600 mt-1">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaBriefcase className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Professional Role
                    </h3>
                  </div>
                  <button
                    onClick={() => openModal("role", { value: role })}
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xl font-medium text-green-600">{role}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Hourly Rate
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      openModal("hourlyRate", { value: hourlyRate })
                    }
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xl font-medium text-green-600">
                  {hourlyRate}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaFileAlt className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                </div>
                <button
                  onClick={() =>
                    openModal("description", { value: description })
                  }
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed break-words">
                {description}
              </p>
            </div>

            {portfolio && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FaBriefcase className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Portfolio
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      openModal("portfolio", { title: "", tech: "" })
                    }
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.map((proj: Portfolio, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer relative group"
                    >
                      <button
                        onClick={() =>
                          openModal(
                            "portfolio",
                            { title: proj.title, tech: proj.tech },
                            index
                          )
                        }
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-green-600 hover:bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <div
                        className={`w-full h-32 bg-gradient-to-br from-${proj.color}-100 to-${proj.color}-200 rounded-lg mb-3 flex items-center justify-center`}
                      >
                        <FaCode className={`w-8 h-8 text-${proj.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        {proj.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{proj.tech}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaHistory className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Work History
                  </h3>
                </div>
                <button
                  onClick={() =>
                    openModal("work", {
                      title: "",
                      company: "",
                      period: "",
                      description: "",
                    })
                  }
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                {workHistory.map((work: WorkHistory, index: number) => (
                  <div key={index} className="flex space-x-4 relative group">
                    <button
                      onClick={() => openModal("work", work, index)}
                      className="absolute -right-2 top-0 text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-${work.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <FaBriefcase
                        className={`w-6 h-6 text-${work.color}-600`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {work.title}
                      </h4>
                      <p className={`text-${work.color}-600 font-medium`}>
                        {work.company}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {work.period}
                      </p>
                      <p className="text-gray-700 text-sm">
                        {work.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                  </h3>
                </div>
                <button
                  onClick={() => openModal("skill", { value: "" })}
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    onClick={() => openModal("skill", { value: skill }, index)}
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
