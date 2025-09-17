import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiPlus, FiBriefcase } from "react-icons/fi";
interface StepFiveProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepFiveForm({ onBack, onNext }: StepFiveProps) {
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">4/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        If you have relevant work experience, add it here.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Freelancers who add their experience are twice as likely to win work.
        But if you’re just starting out, you can still create a great profile.
        Just head on to the next page.
      </p>

      <div className="relative w-full sm:w-1/2 md:w-1/3 h-40 bg-[#F5F5F5] rounded-xl p-4">
        {/* Text */}
        <p className="absolute bottom-4 left-16 text-sm sm:text-base font-semibold">
          Add Experiences
        </p>

        {/* Button */}
        <button className="absolute bottom-4 left-4 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600">
          <FiPlus size={20} />
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
