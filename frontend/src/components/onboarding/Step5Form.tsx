"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../common/Button";
import { z } from "zod";

// Zod schema for experience
// Zod schema for experience with conditional end date
const experienceSchema = z
  .object({
    title: z.string().min(2, "Title is required"),
    company: z.string().min(2, "Company is required"),
    location: z.string().min(2, "Location is required"),
    country: z.string().min(2, "Country is required"),
    startMonth: z.string().min(1, "Start month is required"),
    startYear: z.string().min(4, "Start year is required"),
    currentRole: z.boolean(),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.currentRole) {
      if (!data.endMonth) {
        ctx.addIssue({
          path: ["endMonth"],
          message: "End month is required",
          code: "custom", // ✅ must include
        });
      }
      if (!data.endYear) {
        ctx.addIssue({
          path: ["endYear"],
          message: "End year is required",
          code: "custom", // ✅ must include
        });
      }
    }
  });

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
  const [experiences, setExperiences] = useState<any[]>([]);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

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
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  // In handleSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      company,
      location,
      country,
      startMonth,
      startYear,
      currentRole,
      endMonth: currentRole ? undefined : endMonth, // undefined for conditional validation
      endYear: currentRole ? undefined : endYear,
    };

    const result = experienceSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors and save experience
    setErrors({});
    setExperiences((prev) => [...prev, formData]);

    // Reset form
    setTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setCurrentRole(false);
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  // When toggling currentRole, clear end date errors
  const handleFieldChange = (field: string, value: any) => {
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "startMonth":
        setStartMonth(value);
        break;
      case "startYear":
        setStartYear(value);
        break;
      case "endMonth":
        setEndMonth(value);
        break;
      case "endYear":
        setEndYear(value);
        break;
      case "currentRole":
        setCurrentRole(value);
        if (value) {
          setErrors((prev) => ({
            ...prev,
            endMonth: undefined,
            endYear: undefined,
          }));
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

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

      {experiences.length > 0 && (
        <div className="mt-4 space-y-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <p className="font-semibold">
                {exp.title} at {exp.company}
              </p>
              <p className="text-sm text-gray-600">
                {exp.location}, {exp.country}
              </p>
              <p className="text-sm">
                {exp.startMonth} {exp.startYear} -{" "}
                {exp.currentRole ? "Present" : `${exp.endMonth} ${exp.endYear}`}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6 items-center">
        <Button content="Back" type="button" color="gray" onClick={onBack} />
        <div className="flex items-center gap-4">
          <span
            className="text-green-600 cursor-pointer font-semibold"
            onClick={() => onNext(null)}
          >
            Skip for now
          </span>
          <Button
            content="Next"
            type="button"
            onClick={() => onNext(experiences)}
            disabled={experiences.length === 0}
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/15">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ex: Software Engineer"
                  value={title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Ex: Microsoft"
                  value={company}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">{errors.company}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Ex: London"
                  value={location}
                  onChange={(e) =>
                    handleFieldChange("location", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => handleFieldChange("country", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentRole}
                  onChange={(e) =>
                    handleFieldChange("currentRole", e.target.checked)
                  }
                />
                <span>I am currently working in this role</span>
              </label>

              <div className="flex space-x-2">
                <select
                  value={startMonth}
                  onChange={(e) =>
                    handleFieldChange("startMonth", e.target.value)
                  }
                  className="w-1/2 border px-3 py-2 rounded"
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
                  onChange={(e) =>
                    handleFieldChange("startYear", e.target.value)
                  }
                  className="w-1/2 border px-3 py-2 rounded"
                >
                  <option value="">Start Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.startMonth || errors.startYear) && (
                <p className="text-red-500 text-sm">
                  {errors.startMonth || errors.startYear}
                </p>
              )}

              {!currentRole && (
                <div className="flex space-x-2">
                  <select
                    value={endMonth}
                    onChange={(e) =>
                      handleFieldChange("endMonth", e.target.value)
                    }
                    className="w-1/2 border px-3 py-2 rounded"
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
                    onChange={(e) =>
                      handleFieldChange("endYear", e.target.value)
                    }
                    className="w-1/2 border px-3 py-2 rounded"
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
              {!currentRole && (errors.endMonth || errors.endYear) && (
                <p className="text-red-500 text-sm">
                  {errors.endMonth || errors.endYear}
                </p>
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
