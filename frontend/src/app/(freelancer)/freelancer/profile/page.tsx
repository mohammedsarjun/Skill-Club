"use client";

import { freelancerActionApi } from "@/api/action/FreelancerActionApi";
import React, { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  addressSchema,
  descriptionSchema,
  educationSchema,
  hourlyRateSchema,
  languageProficiencySchema,
  professionalRoleSchema,
  workExperienceSchema,
} from "@/utils/validation";
import {
  FaEdit,
  FaTrash,
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
  FaExclamationTriangle,
} from "react-icons/fa";
import Image from "next/image";
import DynamicFormModal from "@/components/common/Form";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PortfolioModal from "@/components/freelancer/PortfolioModal";
import { IPortfolio } from "@/types/interfaces/IFreelancer";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const dummyProjects = [
  {
    title: "Personal Portfolio Website",
    image: "https://via.placeholder.com/400x250?text=Portfolio+Website",
    technologies: ["React", "TailwindCSS", "TypeScript"],
  },
  {
    title: "E-commerce Dashboard",
    image: "https://via.placeholder.com/400x250?text=E-commerce+Dashboard",
    technologies: ["Next.js", "MongoDB", "Express"],
  },
  {
    title: "Chat Application",
    image: "https://via.placeholder.com/400x250?text=Chat+App",
    technologies: ["Socket.io", "Node.js", "React"],
  },
  {
    title: "Fitness Tracker",
    image: "https://via.placeholder.com/400x250?text=Fitness+Tracker",
    technologies: ["React Native", "Firebase"],
  },
];

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

function FreelancerProfilePage(): JSX.Element {
  useEffect(() => {
    async function fetchData() {
      const response = await freelancerActionApi.getFreelancerData();

      if (response.success) {
        setHourlyRate(`${response.data.hourlyRate}/hour`);
        setDescription(response.data.bio);
        setRole(response.data.professionalRole);
        const responseLanguage = response.data.languages;
        setLanguages(responseLanguage);
        const responseEducation = response.data.education.map((edu: any) => ({
          degree: `${edu.degree} of ${edu.fieldOfStudy}`,
          institution: edu.school,
          period: `${edu.startYear} - ${edu.endYear}`,
        }));
        setEducation(responseEducation);
        console.log(response.data.skills)
        const skill=response.data.skills.map((skill:{name:string,id:string})=>skill.name)
        setSkills(skill);
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
        setCountry(response.data.address.country);
        setCity(response.data.address.city);

        setLogo(response.data.logo);
      } else {
        toast.error(response.message);
      }

      const portfolioResponse = await freelancerActionApi.getPortFolio();

      if (portfolioResponse.success) {
        setPortfolio(portfolioResponse.data);
      } else {
        toast.error(portfolioResponse.message);
      }
    }

    fetchData();
  }, []);

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isOpenEditModal, setIsEditOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isEditModal, setIsEditModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "MongoDB",
  ]);
  const [languages, setLanguages] = useState<
    { name: string; proficiency: string }[]
  >([]);
  const [name, setName] = useState<string>("Sarah Mitchell");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [role, setRole] = useState<string>("Full Stack Developer");
  const [hourlyRate, setHourlyRate] = useState<string>("$85/hour");
  const [description, setDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [education, setEducation] = useState<Education[]>([]);
  const [portfolio, setPortfolio] =
    useState<
      { id: string; title: string; video: string; technologies: string[] }[]
    >();
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

  const [editInitialValues, setEditInitialValues] = useState<
    Record<string, any>
  >({});

  const [portfolioDetail, setPortfolioDetail] = useState<IPortfolio>();

  function handleOpenEditModal(
    name: string,
    populateData?: Record<string, any>,
    docId?: string,
    arrId?: string | number
  ) {
    setActiveModal(name);
    if (name === "location") {
      setEditInitialValues({
        country: location,
      });
    } else if (name == "language") {
      // setEditInitialValues({
      //   language: populateData?.language,
      //   proficiency: populateData?.proficiency,
      // });
    }
    setIsEditOpenModal(true);
  }

  function handleOpenModal(name: string) {
    setActiveModal(name);
    setIsOpenModal(true);
  }

  async function onEditSubmit(submitData:  Record<string, any>, mode: string) {

    if (activeModal == "description") {
      const response = await freelancerActionApi.updateFreelancerDescription(
        submitData
      );

      if (response.success) {
        setDescription(response.data)
        
      } else {
        toast.error(response.message);
      }
    }
  }

  async function onSubmit(submitData: Record<string, any>, mode: string) {
    if (activeModal == "language") {
      const response = await freelancerActionApi.updateFreelancerLanguage(
        submitData
      );

      if (response.success) {
        setLanguages((lang) => response.data.languages);
      } else {
        toast.error(response.message);
      }
    } 
  }

  async function handleOpenPortfolioModal(id: string) {
    const response = await freelancerActionApi.getPortfolioDetails(id);

    if (response.success) {
      setIsPortfolioModalOpen(true);
      setPortfolioDetail(response.data);
      console.log(response);
    } else {
      toast.error(response.message);
    }
  }
  async function handleClosePortfolioModal() {
    setIsPortfolioModalOpen(false);
  }

  async function removeLangugage(language: string, index: number) {
    const result = await MySwal.fire({
      title: "Delete Language?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const response = await freelancerActionApi.deleteFreelancerLanguage(
        language
      );

      if (response.success) {
        setLanguages((prevLangs: { name: string; proficiency: string }[]) => {
          return prevLangs.filter((_, ind) => ind !== index);
        });
      } else {
        toast.error(response.message);
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioModal
        portfolio={portfolioDetail!}
        isOpen={isPortfolioModalOpen}
        onClose={handleClosePortfolioModal}
      ></PortfolioModal>
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
                </div>

                <div className="flex items-center text-gray-600 mt-1">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                  <span className="text-lg">{`${country},${city}`}</span>
                  <button
                    onClick={() => handleOpenEditModal("location")}
                    className="ml-2 text-gray-400 hover:text-green-600"
                  ></button>
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
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaPlus
                      className="w-4 h-4"
                      onClick={() => handleOpenModal("language")}
                    />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {languages.map(
                  (
                    language: { name: string; proficiency: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-700">
                        {language.name} ({language.proficiency})
                      </span>
                      <button
                        className="text-gray-400 hover:text-green-600"
                        onClick={() => removeLangugage(language.name, index)}
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  )
                )}
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
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => handleOpenModal("education")}
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
                      className="absolute right-2 top-0 text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleOpenEditModal("education")}
                    >
                      <FaEdit className="w-4 h-4" />
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
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit
                      className="w-4 h-4"
                      onClick={() => handleOpenEditModal("professionalRole")}
                    />
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
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => handleOpenEditModal("hourlyRate")}
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
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  onClick={() => handleOpenEditModal("description")}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed break-words">
                {description}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Portfolio
                  </h3>
                </div>
                <button
                  onClick={() => router.push("/freelancer/portfolio")}
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Swiper (1 Project per Swipe) */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full"
              >
                {portfolio &&
                  portfolio.map((proj, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleOpenPortfolioModal(proj.id)}
                      >
                        <video
                          src={proj.video}
                          controls
                          className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {proj.title}
                        </h4>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {proj.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaHistory className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Work History
                  </h3>
                </div>
                <button
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  onClick={() => handleOpenModal("workHistory")}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                {workHistory.map((work: WorkHistory, index: number) => (
                  <div key={index} className="flex space-x-4 relative group">
                    <button
                      className="absolute -right-2 top-0 text-gray-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleOpenEditModal("workHistory")}
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
                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  onClick={() => handleOpenModal("skill")}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
                  >
                    {skill}
                    <FaTimes
                      className="ml-2 text-green-700 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent parent click if needed
                        // remove the skill from array
                        const newSkills = skills.filter((_, i) => i !== index);
                        setSkills(newSkills);
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenEditModal && (
        <DynamicFormModal
          title={
            activeModal == "location"
              ? "Edit location"
              : activeModal == "language"
              ? "Edit Language"
              : activeModal == "professionalRole"
              ? "Edit Professional Role"
              : activeModal == "hourlyRate"
              ? "Edit Hourly Rate"
              : activeModal == "description"
              ? "Edit Description"
              : activeModal == "education"
              ? "Edit Education"
              : activeModal == "workHistory"
              ? "Edit Work History"
              : "Edit Work History"
          }
          fields={
            activeModal === "location"
              ? [
                  {
                    name: "country",
                    type: "select",
                    options: [
                      { label: "India", value: "india" },
                      { label: "USA", value: "usa" },
                      { label: "UK", value: "uk" },
                    ],
                    label: "Country",
                  },
                  {
                    name: "address",
                    type: "text",
                    label: "Address",
                    placeholder: "Enter Your Address",
                  },
                  {
                    name: "city",
                    type: "text",
                    label: "City",
                    placeholder: "Enter Your City",
                  },
                  {
                    name: "state",
                    type: "text",
                    label: "State",
                    placeholder: "Enter Your City",
                  },
                  {
                    name: "zip",
                    type: "number",
                    label: "Zip",
                    placeholder: "Enter Your Zip",
                  },
                ]
              : activeModal == "language"
              ? [
                  {
                    name: "language",
                    type: "select",
                    options: [
                      { label: "Hindi", value: "hindi" },
                      { label: "Tamil", value: "tamil" },
                      { label: "Spanish", value: "spanish" },
                    ],
                    label: "Language",
                  },
                  {
                    name: "proficiency",
                    type: "select",
                    options: [
                      { label: "Fluent", value: "fluent" },
                      { label: "Conversational", value: "conversational" },
                    ],
                    label: "Proficiency",
                  },
                ]
              : activeModal == "professionalRole"
              ? [
                  {
                    name: "professionalRole",
                    type: "text",
                    label: "Professional Role",
                    placeholder: "Enter Your Professional Role",
                  },
                ]
              : activeModal == "hourlyRate"
              ? [
                  {
                    name: "hourlyRate",
                    type: "number",
                    label: "Hourly Rate",
                    placeholder: "Enter Your Hourly Rate",
                  },
                ]
              : activeModal == "description"
              ? [
                  {
                    name: "description",
                    type: "text",
                    label: "Description",
                    placeholder: "Enter Your Description",
                  },
                ]
              : activeModal == "education"
              ? [
                  {
                    name: "school",
                    type: "text",
                    label: "School",
                    placeholder: "Enter Your School",
                  },
                  {
                    name: "degree",
                    type: "text",
                    label: "Degree",
                    placeholder: "Enter Your Degree",
                  },
                  {
                    name: "field",
                    type: "text",
                    label: "Field Of Study",
                    placeholder: "Enter Field of study",
                  },
                  {
                    name: "startYear",
                    type: "select",
                    label: "Start Year",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })) as [],
                  },
                  {
                    name: "endYear",
                    type: "select",
                    label: "End Year",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })) as [],
                  },
                ]
              : activeModal == "workHistory"
              ? [
                  {
                    name: "title",
                    type: "text",
                    label: "Title",
                    placeholder: "Enter Your Work Title",
                  },
                  {
                    name: "companyName",
                    type: "text",
                    label: "Company Name",
                    placeholder: "Enter Company Name",
                  },
                  {
                    name: "location",
                    type: "text",
                    label: "Location",
                    placeholder: "Enter Company Location",
                  },
                  {
                    name: "country",
                    type: "text",
                    label: "Country",
                    placeholder: "Enter Company Country",
                  },

                  {
                    name: "startMonth",
                    type: "select",
                    options: months.map((m) => ({
                      label: m,
                      value: m,
                    })),
                    label: "Start Month",
                    group: "startRow",
                  },
                  {
                    name: "startYear",
                    type: "select",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })),
                    label: "Start Year",
                    group: "startRow",
                  },

                  {
                    name: "endMonth",
                    type: "select",
                    options: months.map((m) => ({
                      label: m,
                      value: m,
                    })),
                    label: "End Month",
                    group: "endRow",
                  },
                  {
                    name: "endYear",
                    type: "select",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })),
                    label: "End Year",
                    group: "endRow",
                  },
                  {
                    name: "isCurrentRole",
                    type: "checkbox",
                    label: "I am currently working in this role",
                  },
                ]
              : []
          }
          onSubmit={onEditSubmit}
          onClose={() => setIsEditOpenModal(false)}
          initialValues={editInitialValues}
          mode="update"
          validationSchema={
            activeModal == "address"
              ? addressSchema
              : activeModal == "language"
              ? languageProficiencySchema
              : activeModal == "professionalRole"
              ? professionalRoleSchema
              : activeModal == "hourlyRate"
              ? hourlyRateSchema
              : activeModal == "description"
              ? descriptionSchema
              : activeModal == "education"
              ? educationSchema
              : activeModal == "workHistory"
              ? workExperienceSchema
              : workExperienceSchema
          }
          layout={activeModal == "workHistory" ? "horizontal" : "vertical"}
        />
      )}

      {/* create modal */}
      {isOpenModal && (
        <DynamicFormModal
          title={
            activeModal == "language"
              ? "Add Language"
              : activeModal == "education"
              ? "Add Education"
              : activeModal == "workHistory"
              ? "Add Work History"
              : activeModal == "skill"
              ? "Add Skill"
              : ""
          }
          fields={
            activeModal == "language"
              ? [
                  {
                    name: "name",
                    type: "select",
                    options: [
                      { label: "Hindi", value: "hindi" },
                      { label: "Tamil", value: "tamil" },
                      { label: "Spanish", value: "spanish" },
                    ],
                    label: "Language",
                  },
                  {
                    name: "proficiency",
                    type: "select",
                    options: [
                      { label: "Fluent", value: "fluent" },
                      { label: "Conversational", value: "conversational" },
                    ],
                    label: "Proficiency",
                  },
                ]
              : activeModal == "education"
              ? [
                  {
                    name: "school",
                    type: "text",
                    label: "School",
                    placeholder: "Enter Your School",
                  },
                  {
                    name: "degree",
                    type: "text",
                    label: "Degree",
                    placeholder: "Enter Your Degree",
                  },
                  {
                    name: "field",
                    type: "text",
                    label: "Field Of Study",
                    placeholder: "Enter Field of study",
                  },
                  {
                    name: "startYear",
                    type: "select",
                    label: "Start Year",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })) as [],
                  },
                  {
                    name: "endYear",
                    type: "select",
                    label: "End Year",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })) as [],
                  },
                ]
              : activeModal == "workHistory"
              ? [
                  {
                    name: "title",
                    type: "text",
                    label: "Title",
                    placeholder: "Enter Your Work Title",
                  },
                  {
                    name: "companyName",
                    type: "text",
                    label: "Company Name",
                    placeholder: "Enter Company Name",
                  },
                  {
                    name: "location",
                    type: "text",
                    label: "Location",
                    placeholder: "Enter Company Location",
                  },
                  {
                    name: "country",
                    type: "text",
                    label: "Country",
                    placeholder: "Enter Company Country",
                  },

                  {
                    name: "startMonth",
                    type: "select",
                    options: months.map((m) => ({
                      label: m,
                      value: m,
                    })),
                    label: "Start Month",
                    group: "startRow",
                  },
                  {
                    name: "startYear",
                    type: "select",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })),
                    label: "Start Year",
                    group: "startRow",
                  },

                  {
                    name: "endMonth",
                    type: "select",
                    options: months.map((m) => ({
                      label: m,
                      value: m,
                    })),
                    label: "End Month",
                    group: "endRow",
                  },
                  {
                    name: "endYear",
                    type: "select",
                    options: years.map((year) => ({
                      label: year,
                      value: year,
                    })),
                    label: "End Year",
                    group: "endRow",
                  },
                  {
                    name: "isCurrentRole",
                    type: "checkbox",
                    label: "I am currently working in this role",
                  },
                ]
              : activeModal == "skill"
              ? [
                  {
                    name: "skill",
                    type: "text",
                    label: "Skills",
                    placeholder: "Enter your Skill",
                  },
                ]
              : []
          }
          onSubmit={onSubmit}
          onClose={() => setIsOpenModal(false)}
          initialValues={editInitialValues}
          mode="create"
          validationSchema={
            activeModal == "address"
              ? addressSchema
              : activeModal == "language"
              ? languageProficiencySchema
              : activeModal == "professionalRole"
              ? professionalRoleSchema
              : activeModal == "hourlyRate"
              ? hourlyRateSchema
              : activeModal == "description"
              ? descriptionSchema
              : activeModal == "education"
              ? educationSchema
              : activeModal == "workHistory"
              ? workExperienceSchema
              : workExperienceSchema
          }
          layout={activeModal == "workHistory" ? "horizontal" : "vertical"}
        />
      )}
    </div>
  );
}

export default FreelancerProfilePage;
