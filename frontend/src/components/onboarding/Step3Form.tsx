import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
interface StepTwoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepTwo({ onBack, onNext }: StepTwoProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const suggestedSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "UI/UX",
    "Python",
    "Django",
    "SQL",
    "MongoDB",
    "HTML",
    "CSS",
    "TypeScript",
  ];

  const addSkill = (value: string) => {
    if (
      value &&
      !skills.includes(value) &&
      skills.length < 15
    ) {
      setSkills([...skills, value]);
    }
    setInput("");
  };

  const removeSkill = (value: string) => {
    setSkills(skills.filter((skill) => skill !== value));
  };

  return (
    <div>
       {/* Step Indicator */}
      <p className="text-gray-500">2/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Nearly there! What work are you here to do?
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Your skills show clients what you can offer, and help us choose which
        jobs to recommend to you. Add or remove the ones we’ve suggested, or
        start typing to pick more. It’s up to you.
      </p>

      {/* Input field */}
      <label className="block text-gray-700 mb-2 font-medium">
        Your skills
      </label>
      <input
        type="text"
        className="w-full border rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Type a skill and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSkill(input.trim());
          }
        }}
      />

      {/* Added skills */}
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <FaTimes
              className="ml-2 cursor-pointer hover:text-red-500"
              onClick={() => removeSkill(skill)}
            />
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-6">Max skills allowed: 15</p>

      {/* Suggested skills */}
      <p className="text-gray-700 mb-2 font-medium">Suggested skills</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {suggestedSkills.map((s) => (
          <button
            key={s}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              skills.includes(s)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => addSkill(s)}
            disabled={skills.length >= 15 && !skills.includes(s)}
          >
            {s}
          </button>
        ))}
      </div>

   

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
 
        <Button content="Back" type="submit" color="gray" onClick={onBack}></Button>
        <Button content="Next" type="submit" onClick={onNext}></Button>
      </div>
    </div>
        

  );
}
