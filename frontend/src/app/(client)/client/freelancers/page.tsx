"use client";
import { useState } from "react";

interface Skill {
  skillId: string;
  skillName: string;
}

interface Freelancer {
  freelancerId: string;
  logo: string;
  freelancerName: string;
  professionalRole: string;
  country: string;
  hourlyRate: number;
  jobSuccessRate: number;
  totalEarnedAmount: number;
  skills: Skill[];
  bio: string;
  language: string[];
}

interface FilterState {
  search: string;
  minHourlyRate: number;
  maxHourlyRate: number;
  location: string;
  categoryId: string;
  jobSuccessRate: number;
  languages: string[];
}

const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Tamil", "Portuguese"];
const LOCATIONS = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France"];

// Mock data
const MOCK_FREELANCERS = [
  {
    freelancerId: "1",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    freelancerName: "Sarah Johnson",
    professionalRole: "Full Stack Developer",
    country: "United States",
    hourlyRate: 85,
    jobSuccessRate: 98,
    totalEarnedAmount: 125000,
    skills: [
      { skillId: "1", skillName: "React" },
      { skillId: "2", skillName: "Node.js" },
      { skillId: "3", skillName: "TypeScript" },
      { skillId: "4", skillName: "PostgreSQL" },
      { skillId: "5", skillName: "AWS" },
    ],
    bio: "Experienced full-stack developer with 8+ years building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
    language: ["english", "spanish"],
  },
  {
    freelancerId: "2",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    freelancerName: "Raj Kumar",
    professionalRole: "UI/UX Designer",
    country: "India",
    hourlyRate: 45,
    jobSuccessRate: 95,
    totalEarnedAmount: 78000,
    skills: [
      { skillId: "6", skillName: "Figma" },
      { skillId: "7", skillName: "Adobe XD" },
      { skillId: "8", skillName: "UI Design" },
      { skillId: "9", skillName: "Prototyping" },
      { skillId: "10", skillName: "User Research" },
    ],
    bio: "Creative UI/UX designer passionate about creating intuitive and beautiful user experiences. 5+ years of experience with top-tier startups.",
    language: ["english", "hindi", "tamil"],
  },
  {
    freelancerId: "3",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    freelancerName: "Emma Wilson",
    professionalRole: "Mobile App Developer",
    country: "United Kingdom",
    hourlyRate: 75,
    jobSuccessRate: 97,
    totalEarnedAmount: 95000,
    skills: [
      { skillId: "11", skillName: "React Native" },
      { skillId: "12", skillName: "iOS" },
      { skillId: "13", skillName: "Android" },
      { skillId: "14", skillName: "Flutter" },
      { skillId: "15", skillName: "Swift" },
    ],
    bio: "Mobile app developer specializing in cross-platform applications. Built 50+ apps with millions of downloads.",
    language: ["english", "french"],
  },
  {
    freelancerId: "4",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    freelancerName: "Michael Chen",
    professionalRole: "DevOps Engineer",
    country: "Canada",
    hourlyRate: 90,
    jobSuccessRate: 99,
    totalEarnedAmount: 145000,
    skills: [
      { skillId: "16", skillName: "Docker" },
      { skillId: "17", skillName: "Kubernetes" },
      { skillId: "18", skillName: "CI/CD" },
      { skillId: "19", skillName: "AWS" },
      { skillId: "20", skillName: "Terraform" },
    ],
    bio: "Senior DevOps engineer with expertise in cloud infrastructure and automation. Helping companies scale their operations efficiently.",
    language: ["english", "chinese"],
  },
  {
    freelancerId: "5",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    freelancerName: "Priya Sharma",
    professionalRole: "Data Scientist",
    country: "India",
    hourlyRate: 55,
    jobSuccessRate: 94,
    totalEarnedAmount: 62000,
    skills: [
      { skillId: "21", skillName: "Python" },
      { skillId: "22", skillName: "Machine Learning" },
      { skillId: "23", skillName: "TensorFlow" },
      { skillId: "24", skillName: "Data Analysis" },
      { skillId: "25", skillName: "SQL" },
    ],
    bio: "Data scientist with strong background in machine learning and statistical analysis. Delivered insights that drove 40% revenue growth.",
    language: ["english", "hindi", "tamil"],
  },
  {
    freelancerId: "6",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    freelancerName: "David Martinez",
    professionalRole: "Blockchain Developer",
    country: "Spain",
    hourlyRate: 95,
    jobSuccessRate: 96,
    totalEarnedAmount: 110000,
    skills: [
      { skillId: "26", skillName: "Solidity" },
      { skillId: "27", skillName: "Ethereum" },
      { skillId: "28", skillName: "Web3" },
      { skillId: "29", skillName: "Smart Contracts" },
      { skillId: "30", skillName: "DeFi" },
    ],
    bio: "Blockchain developer specializing in DeFi and smart contract development. Built secure protocols handling millions in transactions.",
    language: ["english", "spanish", "portuguese"],
  },
];

const Freelancers = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    minHourlyRate: 0,
    maxHourlyRate: 200,
    location: "",
    categoryId: "",
    jobSuccessRate: 0,
    languages: [],
  });

  const handleFilterUpdate = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    handleFilterUpdate("languages", newLanguages);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      minHourlyRate: 0,
      maxHourlyRate: 200,
      location: "",
      categoryId: "",
      jobSuccessRate: 0,
      languages: [],
    });
  };

  const filteredFreelancers = MOCK_FREELANCERS.filter((freelancer) => {
    if (
      filters.search &&
      !freelancer.freelancerName.toLowerCase().includes(filters.search.toLowerCase()) &&
      !freelancer.professionalRole.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (freelancer.hourlyRate < filters.minHourlyRate || freelancer.hourlyRate > filters.maxHourlyRate) {
      return false;
    }

    if (filters.location && freelancer.country.toLowerCase() !== filters.location) {
      return false;
    }

    if (freelancer.jobSuccessRate < filters.jobSuccessRate) {
      return false;
    }

    if (filters.languages.length > 0) {
      const hasMatchingLanguage = filters.languages.some((lang) => freelancer.language.includes(lang));
      if (!hasMatchingLanguage) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white border-b border-[hsl(0,0%,90%)] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#14A800] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[hsl(0,0%,15%)]">Find Freelancers</h1>
                <p className="text-sm text-[hsl(0,0%,45%)]">Discover talented professionals for your project</p>
              </div>
            </div>
            <button className="bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Post a Job
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-[hsl(0,0%,90%)] rounded-lg p-6 space-y-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#14A800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <h2 className="text-lg font-semibold text-[hsl(0,0%,15%)]">Filters</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-[hsl(0,0%,45%)] hover:text-[hsl(0,0%,15%)] transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,15%)]">Search</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(0,0%,45%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search freelancers..."
                    value={filters.search}
                    onChange={(e) => handleFilterUpdate("search", e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[hsl(0,0%,90%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[hsl(0,0%,15%)]">
                  Hourly Rate: ${filters.minHourlyRate} - ${filters.maxHourlyRate}
                </label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[hsl(0,0%,45%)]">Min Rate</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={filters.minHourlyRate}
                      onChange={(e) => handleFilterUpdate("minHourlyRate", parseInt(e.target.value))}
                      className="w-full h-2 bg-[hsl(0,0%,90%)] rounded-lg appearance-none cursor-pointer accent-[#14A800]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-[hsl(0,0%,45%)]">Max Rate</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={filters.maxHourlyRate}
                      onChange={(e) => handleFilterUpdate("maxHourlyRate", parseInt(e.target.value))}
                      className="w-full h-2 bg-[hsl(0,0%,90%)] rounded-lg appearance-none cursor-pointer accent-[#14A800]"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,15%)]">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterUpdate("location", e.target.value)}
                  className="w-full px-4 py-2 border border-[hsl(0,0%,90%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent bg-white"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location.toLowerCase()}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Success Rate */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[hsl(0,0%,15%)]">
                  Min Success Rate: {filters.jobSuccessRate}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={filters.jobSuccessRate}
                  onChange={(e) => handleFilterUpdate("jobSuccessRate", parseInt(e.target.value))}
                  className="w-full h-2 bg-[hsl(0,0%,90%)] rounded-lg appearance-none cursor-pointer accent-[#14A800]"
                />
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[hsl(0,0%,15%)]">Languages</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {LANGUAGES.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={language}
                        checked={filters.languages.includes(language.toLowerCase())}
                        onChange={() => handleLanguageToggle(language.toLowerCase())}
                        className="w-4 h-4 text-[#14A800] border-[hsl(0,0%,90%)] rounded focus:ring-[#14A800] accent-[#14A800]"
                      />
                      <label
                        htmlFor={language}
                        className="text-sm text-[hsl(0,0%,15%)] cursor-pointer"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Freelancer List */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[hsl(0,0%,45%)]">
                {filteredFreelancers.length} freelancer{filteredFreelancers.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredFreelancers.length > 0 ? (
              <div className="space-y-4">
                {filteredFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.freelancerId}
                    className="bg-white border border-[hsl(0,0%,90%)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={freelancer.logo}
                          alt={freelancer.freelancerName}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#14A800]"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-semibold text-[hsl(0,0%,15%)]">
                              {freelancer.freelancerName}
                            </h3>
                            <p className="text-[hsl(0,0%,45%)]">{freelancer.professionalRole}</p>
                            <div className="flex items-center gap-1 mt-1 text-sm text-[hsl(0,0%,45%)]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{freelancer.country}</span>
                            </div>
                          </div>
                          <button className="bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                            View Profile
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#14A800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-[hsl(0,0%,15%)]">
                              ${freelancer.hourlyRate}/hr
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#14A800] fill-[#14A800]" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="font-medium text-[hsl(0,0%,15%)]">
                              {freelancer.jobSuccessRate}% Success
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#14A800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="font-medium text-[hsl(0,0%,15%)]">
                              ${freelancer.totalEarnedAmount.toLocaleString()} earned
                            </span>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm text-[hsl(0,0%,15%)] line-clamp-2">{freelancer.bio}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {freelancer.skills.slice(0, 6).map((skill) => (
                            <span
                              key={skill.skillId}
                              className="px-3 py-1 text-sm bg-[hsl(112,100%,95%)] text-[#14A800] border border-[#14A800]/20 rounded-full"
                            >
                              {skill.skillName}
                            </span>
                          ))}
                          {freelancer.skills.length > 6 && (
                            <span className="px-3 py-1 text-sm border border-[hsl(0,0%,90%)] text-[hsl(0,0%,45%)] rounded-full">
                              +{freelancer.skills.length - 6} more
                            </span>
                          )}
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-2 text-sm text-[hsl(0,0%,45%)]">
                          <span className="font-medium">Languages:</span>
                          <span>{freelancer.language.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-[hsl(0,0%,90%)]">
                <svg className="w-16 h-16 text-[hsl(0,0%,45%)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-[hsl(0,0%,15%)] mb-2">No freelancers found</h3>
                <p className="text-[hsl(0,0%,45%)]">Try adjusting your filters to see more results</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Freelancers;