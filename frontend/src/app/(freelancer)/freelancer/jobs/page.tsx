"use client";
import { freelancerActionApi } from "@/api/action/FreelancerActionApi";
import Pagination from "@/components/common/Pagination";
import { FreelancerJobFilters } from "@/types/interfaces/IJob";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaDollarSign,
  FaMapMarkerAlt,
  FaStar,
  FaFilter,
  FaSearch,
  FaClock,
  FaFileAlt,
  FaGlobe,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// Dummy job data
const jobListings = [
  {
    id: 1,
    jobTitle: "Full Stack Web Application Development",
    clientRating: "4.9",
    totalMoneySpend: 50000,
    country: "United States",
    jobRateType: "hourly",
    description:
      "Looking for an experienced full-stack developer to build a comprehensive web application with React frontend and Node.js backend. The project involves creating a scalable architecture with real-time features and third-party integrations.",
    skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
    minHourlyRate: "50",
    maxHourlyRate: "100",
    totalProposalReceived: 28,
  },
  {
    id: 2,
    jobTitle: "Mobile App UI/UX Design",
    clientRating: "5.0",
    totalMoneySpend: 125000,
    country: "United Kingdom",
    jobRateType: "fixed",
    description:
      "Need a talented UI/UX designer to create modern, intuitive designs for our mobile application. Must have experience with iOS and Android design guidelines.",
    skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
    minFixedRate: "3000",
    maxFixedRate: "5000",
    totalProposalReceived: 42,
  },
  {
    id: 3,
    jobTitle: "E-commerce Platform Development",
    clientRating: "4.7",
    totalMoneySpend: 85000,
    country: "Canada",
    jobRateType: "hourly",
    description:
      "Seeking a skilled developer to build a custom e-commerce platform with payment gateway integration, inventory management, and admin dashboard.",
    skills: ["PHP", "Laravel", "MySQL", "Vue.js", "Stripe API"],
    minHourlyRate: "40",
    maxHourlyRate: "75",
    totalProposalReceived: 15,
  },
  {
    id: 4,
    jobTitle: "AI/ML Model Development",
    clientRating: "4.8",
    totalMoneySpend: 200000,
    country: "Germany",
    jobRateType: "fixed",
    description:
      "Looking for an AI specialist to develop and train machine learning models for predictive analytics. Experience with TensorFlow and PyTorch required.",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Data Science",
    ],
    minFixedRate: "8000",
    maxFixedRate: "12000",
    totalProposalReceived: 8,
  },
  {
    id: 5,
    jobTitle: "WordPress Website Customization",
    clientRating: "4.6",
    totalMoneySpend: 15000,
    country: "Australia",
    jobRateType: "hourly",
    description:
      "Need a WordPress expert to customize our existing website with new features, optimize performance, and improve SEO.",
    skills: ["WordPress", "PHP", "JavaScript", "CSS", "SEO"],
    minHourlyRate: "25",
    maxHourlyRate: "50",
    totalProposalReceived: 35,
  },
  {
    id: 6,
    jobTitle: "Blockchain Smart Contract Development",
    clientRating: "4.9",
    totalMoneySpend: 180000,
    country: "Switzerland",
    jobRateType: "fixed",
    description:
      "Seeking an experienced blockchain developer to create secure smart contracts for our DeFi platform. Must have expertise in Solidity and Web3.",
    skills: [
      "Solidity",
      "Ethereum",
      "Web3.js",
      "Smart Contracts",
      "Blockchain",
    ],
    minFixedRate: "10000",
    maxFixedRate: "15000",
    totalProposalReceived: 12,
  },
  {
    id: 7,
    jobTitle: "Mobile Game Development",
    clientRating: "4.5",
    totalMoneySpend: 45000,
    country: "Japan",
    jobRateType: "hourly",
    description:
      "Looking for a Unity game developer to create an engaging mobile game with multiplayer features and in-app purchases.",
    skills: ["Unity", "C#", "Game Development", "3D Modeling", "Animation"],
    minHourlyRate: "35",
    maxHourlyRate: "65",
    totalProposalReceived: 22,
  },
  {
    id: 8,
    jobTitle: "Digital Marketing Campaign Management",
    clientRating: "4.8",
    totalMoneySpend: 95000,
    country: "United States",
    jobRateType: "fixed",
    description:
      "Need a digital marketing expert to manage our multi-channel marketing campaigns including SEO, PPC, and social media marketing.",
    skills: [
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "Content Marketing",
      "Analytics",
    ],
    minFixedRate: "4000",
    maxFixedRate: "7000",
    totalProposalReceived: 48,
  },
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Australia",
  "Switzerland",
  "Japan",
  "India",
];

const FreelancerJobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [apiCategories, setApiCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const limit=5

  const selectedCategoryObj = apiCategories.find(
    (c) => c.categoryId === selectedCategory
  );

  const availableSpecialties = selectedCategoryObj
    ? selectedCategoryObj.specialities
    : [];

  const selectedSpecialityObj = selectedCategoryObj
    ? selectedCategoryObj.specialities?.find(
        (s: any) => s.specialityId === selectedSpecialty
      )
    : null;

  const availableSkills = selectedSpecialityObj
    ? selectedSpecialityObj.skills
    : [];

  const handleCategoryChange = (category: string) => {
    // category may be an id (from API) or a name (from static fallback)
    setSelectedCategory(category);
    setSelectedSpecialty("");
    setSelectedSkills([]);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedSkills([]);
  };
  const [rateType, setRateType] = useState("");
  const [minHourlyRate, setMinHourlyRate] = useState("");
  const [maxHourlyRate, setMaxHourlyRate] = useState("");
  const [minFixedRate, setMinFixedRate] = useState("");
  const [maxFixedRate, setMaxFixedRate] = useState("");
  const [selectedProposalRanges, setSelectedProposalRanges] = useState<
    string[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(true);
      } else {
        setShowFilters(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await freelancerActionApi.getAllCategories();
        if (response && response.success) {
          const mapped = response.data.map((category: any) => ({
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            specialities: [],
          }));
          setApiCategories(mapped);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const isApiCategory = apiCategories.some(
      (c) => c.categoryId === selectedCategory
    );
    if (!isApiCategory) return;

    let mounted = true;
    async function loadSpecialities() {
      try {
        const resp = await freelancerActionApi.getSpecialitiesWithSkills(
          selectedCategory
        );
        if (resp && resp.success && mounted) {
          setApiCategories((prev) =>
            prev.map((cat) =>
              cat.categoryId === selectedCategory
                ? { ...cat, specialities: resp.data }
                : cat
            )
          );
        }

        console.log(resp);
      } catch (err) {
        console.error("Failed to load specialities", err);
      }
    }

    loadSpecialities();
    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  const proposalRanges = [
    { label: "Less than 5", value: "0-5" },
    { label: "5 to 10", value: "5-10" },
    { label: "10 to 15", value: "10-15" },
    { label: "15 to 20", value: "15-20" },
    { label: "20 to 50", value: "20-50" },
  ];

  const handleSkillToggle = (skill: string) => {
    console.log(skill);
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleProposalRangeToggle = (range: string) => {
    setSelectedProposalRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const filteredJobs = jobListings.filter((job) => {
    // Search query
    if (
      searchQuery &&
      !job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Skills filter
    if (
      selectedSkills.length > 0 &&
      !selectedSkills.some((skill) => job.skills.includes(skill))
    ) {
      return false;
    }

    // Rate type filter
    if (rateType && job.jobRateType !== rateType) {
      return false;
    }

    // Hourly rate filter
    if (rateType === "hourly" && minHourlyRate && job.minHourlyRate) {
      if (parseInt(job.minHourlyRate) < parseInt(minHourlyRate)) {
        return false;
      }
    }
    if (rateType === "hourly" && maxHourlyRate && job.maxHourlyRate) {
      if (parseInt(job.maxHourlyRate) > parseInt(maxHourlyRate)) {
        return false;
      }
    }

    // Fixed rate filter
    if (rateType === "fixed" && minFixedRate && job.minFixedRate) {
      if (parseInt(job.minFixedRate) < parseInt(minFixedRate)) {
        return false;
      }
    }
    if (rateType === "fixed" && maxFixedRate && job.maxFixedRate) {
      if (parseInt(job.maxFixedRate) > parseInt(maxFixedRate)) {
        return false;
      }
    }

    // Proposal range filter
    if (selectedProposalRanges.length > 0) {
      const matchesRange = selectedProposalRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return (
          job.totalProposalReceived >= min && job.totalProposalReceived <= max
        );
      });
      if (!matchesRange) return false;
    }

    // Country filter
    if (selectedCountry && job.country !== selectedCountry) {
      return false;
    }

    // Rating filter
    if (
      selectedRating &&
      parseFloat(job.clientRating) < parseFloat(selectedRating)
    ) {
      return false;
    }

    return true;
  });

useEffect(() => {
  const timer = setTimeout(() => {
    async function fetchJobs() {
      const filters: FreelancerJobFilters = {
        searchQuery,
        selectedCategory,
        selectedSpecialty,
        selectedSkills,
        rateType,
        minHourlyRate,
        maxHourlyRate,
        minFixedRate,
        maxFixedRate,
        selectedProposalRanges,
        selectedCountry,
        selectedRating,
        page:currentPage,
        limit,
      };
      const response = await freelancerActionApi.getJobs(filters);
      console.log(response);
    }
    fetchJobs();
    console.log("📋 Filtered Jobs:", filteredJobs.length);
  }, 500);

  return () => clearTimeout(timer);
}, [
  searchQuery,
  selectedCategory,
  selectedSpecialty,
  selectedSkills,
  rateType,
  minHourlyRate,
  maxHourlyRate,
  minFixedRate,
  maxFixedRate,
  selectedProposalRanges,
  selectedCountry,
  selectedRating,
  currentPage,
  totalPages,
]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#108A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d7000] transition-colors flex items-center gap-2"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaFilter className="text-[#108A00]" />
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Category (API-driven, fallback to static) */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {apiCategories.length > 0
                      ? apiCategories.map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                          </option>
                        ))
                      : []}
                  </select>
                </div>

                {/* Specialty - Only show when category is selected (API-driven, fallback to static) */}
                {selectedCategory && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialty
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => handleSpecialtyChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
                    >
                      <option value="">All Specialties</option>
                      {availableSpecialties.length > 0
                        ? availableSpecialties.map((spec: any) => (
                            <option
                              key={spec.specialityId ?? spec}
                              value={spec.specialityId ?? spec}
                            >
                              {spec.specialityName ?? spec}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                )}

                {/* Skills - Only show when specialty is selected */}
                {selectedSpecialty && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Skills
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableSkills.map((skill: any) => (
                        <label
                          key={skill.skillId ?? skill}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(
                              skill.skillId ?? skill
                            )}
                            onChange={() =>
                              handleSkillToggle(skill.skillId ?? skill)
                            }
                            className="w-4 h-4 text-[#108A00] border-gray-300 rounded focus:ring-[#108A00]"
                          />
                          <span className="text-sm text-gray-700">
                            {skill.skillName ?? skill}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rate Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rate Type
                  </label>
                  <select
                    value={rateType}
                    onChange={(e) => setRateType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>

                {/* Hourly Rate */}
                {rateType === "hourly" && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hourly Rate Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minHourlyRate}
                        onChange={(e) => setMinHourlyRate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxHourlyRate}
                        onChange={(e) => setMaxHourlyRate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Fixed Rate */}
                {rateType === "fixed" && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fixed Rate Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minFixedRate}
                        onChange={(e) => setMinFixedRate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxFixedRate}
                        onChange={(e) => setMaxFixedRate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Proposals Received */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Proposals
                  </label>
                  <div className="space-y-2">
                    {proposalRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProposalRanges.includes(range.value)}
                          onChange={() =>
                            handleProposalRangeToggle(range.value)
                          }
                          className="w-4 h-4 text-[#108A00] border-gray-300 rounded focus:ring-[#108A00]"
                        />
                        <span className="text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#108A00] focus:border-transparent"
                  >
                    <option value="">Any Rating</option>
                    <option value="1">1+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setSelectedSpecialty("");
                    setSelectedSkills([]);
                    setRateType("");
                    setMinHourlyRate("");
                    setMaxHourlyRate("");
                    setMinFixedRate("");
                    setMaxFixedRate("");
                    setSelectedProposalRanges([]);
                    setSelectedCountry("");
                    setSelectedRating("");
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Job Listings */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredJobs.length}
                </span>{" "}
                jobs found
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#108A00] transition-colors">
                        {job.jobTitle}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-400" size={14} />
                          <span>{job.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={14} />
                          <span className="font-semibold text-gray-900">
                            {job.clientRating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaDollarSign className="text-gray-400" size={14} />
                          <span>
                            ${(job.totalMoneySpend / 1000).toFixed(0)}k spent
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaFileAlt className="text-gray-400" size={14} />
                          <span>{job.totalProposalReceived} proposals</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      {job.jobRateType === "hourly" ? (
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                          <div className="text-xs font-medium mb-1">Hourly</div>
                          <div className="text-lg font-bold">
                            ${job.minHourlyRate}-${job.maxHourlyRate}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                          <div className="text-xs font-medium mb-1">
                            Fixed Price
                          </div>
                          <div className="text-lg font-bold">
                            ${job.minFixedRate}-${job.maxFixedRate}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#108A00] hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-[#108A00] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0d7000] transition-colors">
                      Apply Now
                    </button>
                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:border-[#108A00] hover:text-[#108A00] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <FaBriefcase
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
            {/* Pagination */}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerJobListing;
