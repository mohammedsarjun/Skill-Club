import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../common/Button";

interface StepSixProps {
  onBack: () => void;
  onNext: (data: any) => void;
}

export default function StepSixForm({ onBack, onNext }: StepSixProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Store multiple educations
  const [educations, setEducations] = useState<any[]>([]);

  // Form states
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      school,
      degree,
      field,
      startYear,
      endYear,
    };

    // Save education
    setEducations((prev) => [...prev, data]);

    // Reset fields
    setSchool("");
    setDegree("");
    setField("");
    setStartYear("");
    setEndYear("");

    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <p className="text-gray-500">5/9</p>
      <h2 className="text-2xl font-semibold mb-2">
        Clients like to know what you know - add your education here.
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        You don’t have to have a degree. Adding any relevant education helps
        make your profile more visible.
      </p>

      <div className="relative w-full max-w-sm sm:w-1/2 md:w-1/3 h-40 bg-[#F5F5F5] rounded-xl p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-13 left-10 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600"
        >
          <FiPlus size={20} />
        </button>
        <p className="absolute bottom-5 left-10 text-sm sm:text-base font-semibold">
          Add Education
        </p>
      </div>

      {/* ✅ Show saved educations */}
      {educations.length > 0 && (
        <div className="mt-4 space-y-2">
          {educations.map((edu, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <p className="font-semibold">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school}</p>
              <p className="text-sm">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button content="Back" type="button" color="gray" onClick={onBack} />
        {/* ✅ Pass all educations */}
        <Button
          content="Next"
          type="button"
          onClick={() => onNext(educations)}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        >
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ex: Harvard University"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Ex: Bachelor’s"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Ex: Computer Science"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="flex space-x-2">
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                >
                  <option value="">Start Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                >
                  <option value="">End Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
