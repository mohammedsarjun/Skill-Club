"use client";
import { useState } from "react";
import Button from "../common/Button";
import Checkbox from "../common/CheckBox";
const categories = [
  { id: "programming", name: "Programming" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
];

const specialtiesMap: Record<string, { id: string; name: string }[]> = {
  programming: [
    { id: "web-dev", name: "Web Development" },
    { id: "app-dev", name: "App Development" },
    { id: "data-science", name: "Data Science" },
  ],
  design: [
    { id: "ui-ux", name: "UI/UX Design" },
    { id: "graphic", name: "Graphic Design" },
  ],
  marketing: [
    { id: "seo", name: "SEO" },
    { id: "content", name: "Content Marketing" },
  ],
};

export default function Step2Form({
  onNext,
  onBack,
  savedData,
}: {
  onNext: (data: any) => void;
  onBack: () => void;
  savedData?: any;
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    savedData?.category || ""
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    savedData?.specialties || []
  );

  const specialties = selectedCategory
    ? specialtiesMap[selectedCategory] || []
    : [];

  function toggleSpecialty(id: string) {
    if (selectedSpecialties.includes(id)) {
      setSelectedSpecialties((prev) => prev.filter((s) => s !== id));
    } else if (selectedSpecialties.length < 3) {
      setSelectedSpecialties((prev) => [...prev, id]);
    }
  }

  function clearSelection() {
    setSelectedCategory("");
    setSelectedSpecialties([]);
  }

  function handleNext() {
    onNext({ category: selectedCategory, specialties: selectedSpecialties });
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <p className="text-gray-500">1/9</p>

      {/* Headline */}
      <h2 className="text-4xl ">
        Great, so what kind of work are you here to do?
      </h2>
      <p className="text-md">
        Don't worry, you can change these choices later on.
      </p>

      {/* Lists */}
      <div className="flex gap-6">
        {/* Category List (fixed width) */}
        <div className="w-60 border-r border-gray-300 pr-4">
          <p className="text-gray-500 text-sm mb-2">Select 1 category</p>
          <ul className="flex flex-col gap-2 flex-wrap">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer transition ${
                  selectedCategory === cat.id
                    ? "text-green-600 font-semibold"
                    : "text-gray-800 hover:text-green-600"
                }`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSpecialties([]);
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Specialties List (flexible) */}
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-2">
            Now, Select 1 to 3 specialties
          </p>
          <ul className="flex flex-col gap-2">
            {selectedCategory ? (
              specialties.map((spec) => (
                <li
                  key={spec.id}
                  className="flex items-center cursor-pointer transition"
                  onClick={() => toggleSpecialty(spec.id)}
                >
                  <Checkbox
                    name=""
                    sizeClass="w-4 h-4"
                    className="mr-3"
                    checked={selectedSpecialties.includes(spec.id)}
                  ></Checkbox>

                  <span
                    className={`${
                      selectedSpecialties.includes(spec.id)
                        ? "text-green-600 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {spec.name}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">Select a category first</li>
            )}
          </ul>

          {/* Clear Selection */}
          {(selectedCategory || selectedSpecialties.length > 0) && (
            <button
              className="text-sm text-red-500 underline mt-2"
              onClick={clearSelection}
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          content="Back"
          type="submit"
          color="gray"
          onClick={onBack}
        ></Button>
        <Button
          content="Next"
          type="submit"
          disabled={!(selectedCategory && selectedSpecialties.length > 0)}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
