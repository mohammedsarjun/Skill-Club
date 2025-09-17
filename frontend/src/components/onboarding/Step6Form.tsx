import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiPlus, FiBriefcase } from "react-icons/fi";
interface StepSixProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepSixForm({ onBack, onNext }: StepSixProps) {
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">5/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Clients like to know what you know - add your education here.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        You don’t have to have a degree. Adding any relevant education helps
        make your profile more visible.
      </p>

      <div className="relative w-full max-w-sm sm:w-1/2 md:w-1/3 h-40 bg-[#F5F5F5] rounded-xl p-4">
        {/* Button */}
        <button className="absolute bottom-13 left-10 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600">
          <FiPlus size={20} />
        </button>

        {/* Text */}
        <p className="absolute bottom-5 left-10 text-sm sm:text-base font-semibold">
          Add Education
        </p>
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
