"use client";
import { useState } from "react";
import Input from "@/components/common/Input";
import DynamicFormModal, { Field } from "@/components/common/Form";

interface JobCreationStep2Props {
  step: string;
  totalSteps: string;
}

type Speciality = keyof typeof specialityOptions;

const specialityOptions = {
  "Web Development": ["React", "Next.js", "Node.js", "HTML/CSS"],
  "Graphic Design": ["Photoshop", "Illustrator", "Figma"],
  "Digital Marketing": ["SEO", "Google Ads", "Social Media"],
  "Content Writing": ["Blog Writing", "Copywriting", "Technical Writing"],
  "UI/UX Design": ["Wireframing", "Prototyping", "User Research"],
  "Mobile App Development": ["React Native", "Flutter", "Swift", "Kotlin"],
} as const;

function JobCreationStep2({ step, totalSteps }: JobCreationStep2Props) {
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSpecialitySelect = (speciality: Speciality) => {
    setSelectedSpeciality((spec) => [...spec, speciality]);
    setSelectedSkills([]); // Reset skills when speciality changes
  };
const availableSkills = selectedSpeciality.map(
  (selectedSpec) => [selectedSpec, ...specialityOptions[selectedSpec]]
);
console.log

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-gray-500">{`${step}/${totalSteps}`}</p>
          <h2 className="text-4xl">
            What are the main specialties and skills required for your work?
          </h2>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 space-y-6 mt-6 md:mt-0">
          {/* Speciality Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Speciality
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(specialityOptions).map((speciality) => (
                <button
                  key={speciality}
                  onClick={() =>
                    handleSpecialitySelect(speciality as Speciality)
                  }
                  className={`px-4 py-2 rounded-full border transition-all ${
                    selectedSpeciality.includes(speciality as Speciality )
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {speciality}
                </button>
              ))}
            </div>
            <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">
              + View More Specialities
            </button>
          </div>

          {/* Skills Selection */}
          {selectedSpeciality && (
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill,index) => (
                  <button
                    key={index}
                    onClick={() => handleSkillChange(String(skill))}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      selectedSkills.includes(String(skill))
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">
                + View More Skills
              </button>
            </div>
          )}

          {/* Selected Summary */}
          {selectedSpeciality && selectedSkills.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Selected:
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Speciality:</span>{" "}
                {selectedSpeciality}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Skills:</span>{" "}
                {selectedSkills.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobCreationStep2;
