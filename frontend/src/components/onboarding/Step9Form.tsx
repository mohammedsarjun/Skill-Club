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
      <p className="text-gray-500">8/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Now, let’s set your hourly rate.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Clients will see this rate on your profile and in search results once
        you publish your profile. You can adjust your rate every time you submit
        a proposal.
      </p>

       {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
       Hourly rate
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
       Total amount the client will see.
      </p>

      <Input type="text" value="₹250.00" className="w-1/2" fullWidth={false}></Input>



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
