import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
import { FaTrash } from "react-icons/fa";

interface StepSevenProps {
  onBack: () => void;
  onNext: () => void;
}

interface Language {
  id: number;
  name: string;
  proficiency: "Conversational" | "Fluent";
  mandatory?: boolean;
}

export default function StepSevenForm({ onBack, onNext }: StepSevenProps) {
 const [languages, setLanguages] = useState<Language[]>([
    { id: 1, name: "English", proficiency: "Fluent", mandatory: true },
  ]);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      { id: Date.now(), name: "", proficiency: "Conversational" },
    ]);
  };

  const removeLanguage = (id: number) => {
    setLanguages(languages.filter((lang) => !lang.mandatory && lang.id !== id));
  };

  const handleChange = (
    id: number,
    field: keyof Language,
    value: string
  ) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">6/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Looking good. Next, tell us which languages you speak.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Skill Club is global, so clients are often interested to know what
        languages you speak. English is a must, but do you speak any other
        languages?
      </p>

      <div className="w-full max-w-2xl p-4">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center justify-between mb-3 bg-[#F5F5F5] p-3 rounded-lg"
          >
            {/* Language selection */}
            <select
              value={lang.name}
              onChange={(e) => handleChange(lang.id, "name", e.target.value)}
              className={`p-2 rounded border border-gray-300 w-1/2 ${
                lang.mandatory ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              disabled={lang.mandatory}
            >
              {lang.mandatory ? (
                <option value="English">English</option>
              ) : (
                <>
                  <option value="">Select Language</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Spanish">Spanish</option>
                </>
              )}
            </select>

            {/* Proficiency + delete */}
            <div className="flex items-center space-x-2">
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  handleChange(lang.id, "proficiency", e.target.value)
                }
                className="p-2 rounded border border-gray-300"
              >
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
              </select>

              {!lang.mandatory && (
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add new language button */}
        <button
          onClick={addLanguage}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Language
        </button>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          content="Back"
          type="submit"
          color="gray"
          onClick={onBack}
        ></Button>
        <Button content="Next" type="submit" onClick={onNext}></Button>
      </div>
    </div>
  );
}
