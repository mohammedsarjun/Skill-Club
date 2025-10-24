"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaLayerGroup,
  FaStar,
  FaCode,
  FaCheck,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { freelancerActionApi } from "@/api/action/FreelancerActionApi";
import { onboardingApi } from "@/api/onboardingApi";

// Mock data - replace with actual API data
const CATEGORIES_DATA = [
  {
    id: "1",
    name: "Web Development",
    specialties: [
      {
        id: "1-1",
        name: "Frontend Development",
        skills: [
          "React",
          "Vue.js",
          "Angular",
          "TypeScript",
          "HTML/CSS",
          "Next.js",
          "Svelte",
        ],
      },
      {
        id: "1-2",
        name: "Backend Development",
        skills: ["Node.js", "React", "Java", "PHP", "Ruby", "Go", "C#"],
      },
      {
        id: "1-3",
        name: "Full Stack Development",
        skills: [
          "MERN Stack",
          "MEAN Stack",
          "Django",
          "Laravel",
          "Ruby on Rails",
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Mobile Development",
    specialties: [
      {
        id: "2-1",
        name: "iOS Development",
        skills: ["Swift", "Objective-C", "SwiftUI", "UIKit"],
      },
      {
        id: "2-2",
        name: "Android Development",
        skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK"],
      },
      {
        id: "2-3",
        name: "Cross-Platform",
        skills: ["React Native", "Flutter", "Ionic", "Xamarin"],
      },
    ],
  },
  {
    id: "3",
    name: "Design",
    specialties: [
      {
        id: "3-1",
        name: "UI/UX Design",
        skills: ["Figma", "Adobe XD", "Sketch", "InVision", "Prototyping"],
      },
      {
        id: "3-2",
        name: "Graphic Design",
        skills: ["Photoshop", "Illustrator", "CorelDRAW", "Canva"],
      },
      {
        id: "3-3",
        name: "Motion Graphics",
        skills: ["After Effects", "Premiere Pro", "Cinema 4D", "Blender"],
      },
    ],
  },
  {
    id: "4",
    name: "Data Science",
    specialties: [
      {
        id: "4-1",
        name: "Machine Learning",
        skills: [
          "TensorFlow",
          "PyTorch",
          "Scikit-learn",
          "Keras",
          "Computer Vision",
        ],
      },
      {
        id: "4-2",
        name: "Data Analysis",
        skills: ["Python", "R", "SQL", "Excel", "Tableau", "Power BI"],
      },
      {
        id: "4-3",
        name: "Big Data",
        skills: ["Hadoop", "Spark", "Kafka", "Elasticsearch"],
      },
    ],
  },
  {
    id: "5",
    name: "Marketing",
    specialties: [
      {
        id: "5-1",
        name: "Digital Marketing",
        skills: ["SEO", "SEM", "Google Ads", "Facebook Ads", "Email Marketing"],
      },
      {
        id: "5-2",
        name: "Content Marketing",
        skills: ["Copywriting", "Content Strategy", "Blogging", "Social Media"],
      },
      {
        id: "5-3",
        name: "Analytics",
        skills: ["Google Analytics", "GTM", "Data Studio", "A/B Testing"],
      },
    ],
  },
];

export default function ExpertiseManagementPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [specialities, setSpecialities] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  }>();
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<{ id: string; name: string }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [searchCategory, setSearchCategory] = useState("");
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchSkill, setSearchSkill] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch existing selections from API
    async function fetchExpertise() {
      try {
        const categoryResponse = await onboardingApi.getCategories();
        if (categoryResponse.success) {
          setCategories(categoryResponse.data || []);
          console.log(categoryResponse.data);
        }
        //   setSelectedSpecialties(response.data.specialties || []);
        //   setSelectedSkills(response.data.skills || []);
      } catch (error) {
        console.error("Error fetching expertise:", error);
      }
    }
    fetchExpertise();
  }, []);

  const selectCategory = (categoryId: string, categoryName: string) => {
    // If clicking the same category, deselect it
    if (selectedCategory?.id == categoryId) {
      setSelectedCategory(undefined);
      setSelectedSpecialties([]); // Clear specialties when category is deselected
      setSelectedSkills([]); // Clear skills when category is deselected
    } else {
      setSelectedCategory({ id: categoryId, name: categoryName });
      setSelectedSpecialties([]); // Clear specialties when changing category
      setSelectedSkills([]); // Clear skills when changing category
      setSpecialities([]);
      getAvailableSpecialties(categoryId);
    }
  };

  const toggleSpecialty = async (specialtyId:string,specialtyName: string) => {
    // setSelectedSpecialties((prev) => {
    //   const next = prev.includes(specialtyName)
    //     ? prev.filter((s) => s !== specialtyName)
    //     : [...prev, specialtyName];
    //     console.log(next)
    // //   const skillResponse= await onboardingApi.getSuggestedSkills()
    //   return next;
    // });
  };

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSave = async () => {
    // try {
    //   setIsSaving(true);
    // //   // Call your API to save the selections
    // //   const response = await freelancerActionApi.updateExpertise({
    // //     category: selectedCategory,
    // //     specialties: selectedSpecialties,
    // //     skills: selectedSkills
    // //   });
    //   if (response.success) {
    //     toast.success("Expertise updated successfully!");
    //     router.push("/freelancer/profile");
    //   } else {
    //     toast.error(response.message || "Failed to update expertise");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while saving");
    //   console.error(error);
    // } finally {
    //   setIsSaving(false);
    // }
  };

  const filteredCategories = CATEGORIES_DATA.filter((cat) =>
    cat.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const getAvailableSpecialties = async (categoryId: string) => {
    if (!selectedCategory) return [];

    const specialityResponse = await onboardingApi.getSpecialities(categoryId);
    setSpecialities(specialityResponse.data);
  };

  const getAvailableSkills = () => {
    // if (selectedSpecialties.length === 0) return [];

    // const skills = CATEGORIES_DATA.flatMap((cat) => cat.specialties)
    //   .filter((spec) => selectedSpecialties.includes(spec.name))
    //   .flatMap((spec) => spec.skills);

    // return [...new Set(skills)].filter((skill) =>
    //   skill.toLowerCase().includes(searchSkill.toLowerCase())
    // );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Your Expertise
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Select a category, specialties, and skills that match your
                  expertise
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Selection Process */}
        <div className="space-y-6">
          {/* Step 1: Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Select Category
                  </h2>
                  <p className="text-sm text-gray-600">
                    Choose one main category you work in
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id, category.name)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCategory?.id === category.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FaLayerGroup
                        className={`w-5 h-5 ${
                          selectedCategory?.id === category.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          selectedCategory?.id === category.id
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                    {selectedCategory?.id === category.id && (
                      <FaCheck className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Specialties */}
          <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-opacity ${
              !selectedCategory ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Select Specialties
                  </h2>
                  <p className="text-sm text-gray-600">
                    {!selectedCategory
                      ? "Select a category first"
                      : "Choose your specific areas of expertise"}
                  </p>
                </div>
              </div>
            </div>

            {selectedCategory && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* {specialities.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => toggleSpecialty(specialty.id,specialty.name)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedSpecialties.includes(specialty.name)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FaStar
                            className={`w-5 h-5 ${
                              selectedSpecialties.includes(specialty.name)
                                ? "text-purple-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              selectedSpecialties.includes(specialty.name)
                                ? "text-purple-700"
                                : "text-gray-700"
                            }`}
                          >
                            {specialty.name}
                          </span>
                        </div>
                        {selectedSpecialties.includes(specialty.name) && (
                          <FaCheck className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </button>
                  ))} */}
                </div>
              </>
            )}
          </div>

          {/* Step 3: Skills */}
          <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-opacity ${
              selectedSpecialties.length === 0 ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Select Skills
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedSpecialties.length === 0
                      ? "Select at least one specialty first"
                      : "Choose the specific skills you possess"}
                  </p>
                </div>
              </div>
            </div>

            {selectedSpecialties.length > 0 && (
              <>
                <div className="flex flex-wrap gap-2">
                  {/* {getAvailableSkills().map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full border-2 transition-all font-medium ${
                        selectedSkills.includes(skill)
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-green-300 bg-white text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{skill}</span>
                        {selectedSkills.includes(skill) ? (
                          <FaCheck className="w-4 h-4" />
                        ) : (
                          <FaTimes className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                  ))} */}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Selected Summary */}
        {(selectedCategory ||
          selectedSpecialties.length > 0 ||
          selectedSkills.length > 0) && (
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Your Selected Expertise
            </h3>

            <div className="space-y-4">
              {selectedCategory && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                    <FaLayerGroup className="w-4 h-4 mr-2 text-blue-600" />
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center space-x-2">
                      <span>{selectedCategory.name}</span>
                      <button
                        onClick={() =>
                          selectCategory(
                            selectedCategory.id,
                            selectCategory.name
                          )
                        }
                        className="hover:text-blue-900"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {selectedSpecialties.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                    <FaStar className="w-4 h-4 mr-2 text-purple-600" />
                    Specialties ({selectedSpecialties.length})
                  </p>
                  {/* <div className="flex flex-wrap gap-2">
                    {selectedSpecialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>{spec}</span>
                        <button
                          onClick={() => toggleSpecialty(spec)}
                          className="hover:text-purple-900"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div> */}
                </div>
              )}

              {selectedSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                    <FaCode className="w-4 h-4 mr-2 text-green-600" />
                    Skills ({selectedSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => toggleSkill(skill)}
                          className="hover:text-green-900"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              isSaving ||
              (!selectedCategory &&
                selectedSpecialties.length === 0 &&
                selectedSkills.length === 0)
            }
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
