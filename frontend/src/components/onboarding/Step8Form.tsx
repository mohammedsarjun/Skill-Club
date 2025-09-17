import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
import { FaTrash } from "react-icons/fa";

interface StepSevenProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepSevenForm({ onBack, onNext }: StepSevenProps) {
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">7/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Great. Now write a bio to tell the world about yourself.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Help people get to know you at a glance. What work do you do best? Tell
        them clearly, using paragraphs or bullet points. You can always edit
        later; just make sure you proofread now.
      </p>

      <textarea
        name=""
        id=""
        className="w-1/2 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
      ></textarea>
      <p className="font-semibold text-sm">At least 100 characters</p>

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
