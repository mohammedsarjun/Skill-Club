import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../common/Button";

interface StepFiveProps {
  onBack: () => void;
  onNext: (data: any) => void;
}

export default function StepFiveForm({ onBack, onNext }: StepFiveProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [currentRole, setCurrentRole] = useState(false);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // ✅ Store multiple experiences
  const [experiences, setExperiences] = useState<any[]>([]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      company,
      location,
      country,
      currentRole,
      startMonth,
      startYear,
      endMonth: currentRole ? null : endMonth,
      endYear: currentRole ? null : endYear,
    };

    // ✅ Save experience
    setExperiences((prev) => [...prev, data]);

    // Reset form fields
    setTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setCurrentRole(false);
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");

    setIsOpen(false); // Close modal
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <p className="text-gray-500">4/9</p>
      <h2 className="text-2xl font-semibold mb-2">
        If you have relevant work experience, add it here.
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Freelancers who add their experience are twice as likely to win work.
        But if you’re just starting out, you can still create a great profile.
        Just head on to the next page.
      </p>

      <div className="relative w-full sm:w-1/2 md:w-1/3 h-40 bg-[#F5F5F5] rounded-xl p-4">
        <p className="absolute bottom-4 left-16 text-sm sm:text-base font-semibold">
          Add Experiences
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-4 left-4 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600"
        >
          <FiPlus size={20} />
        </button>
      </div>

      {/* ✅ Show saved experiences */}
      {experiences.length > 0 && (
        <div className="mt-4 space-y-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <p className="font-semibold">{exp.title} at {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}, {exp.country}</p>
              <p className="text-sm">
                {exp.startMonth} {exp.startYear} -{" "}
                {exp.currentRole ? "Present" : `${exp.endMonth} ${exp.endYear}`}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button content="Back" type="button" color="gray" onClick={onBack} />
        {/* ✅ Pass all experiences on Next */}
        <Button
          content="Next"
          type="button"
          onClick={() => onNext(experiences)}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        >
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ex: Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Ex: Microsoft"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Ex: London"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRole}
                    onChange={() => setCurrentRole(!currentRole)}
                  />
                  <span>I am currently working in this role</span>
                </label>
              </div>

              <div className="flex space-x-2">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                >
                  <option value="">Start Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
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
              </div>

              {!currentRole && (
                <div className="flex space-x-2">
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                    className="w-1/2 border px-3 py-2 rounded"
                    required
                  >
                    <option value="">End Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
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
              )}

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
