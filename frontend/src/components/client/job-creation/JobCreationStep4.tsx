"use client";
import { useState } from "react";
import Input from "@/components/common/Input";
import DynamicFormModal, { Field } from "@/components/common/Form";
import { FaClock, FaMoneyBillWave } from "react-icons/fa";

interface JobCreationStep4Props {
  step: string;
  totalSteps: string;
}

function JobCreationStep4({ step, totalSteps }: JobCreationStep4Props) {
  const [selectedRate, setSelectedRate] = useState("hourly");
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-gray-500">{`${step}/${totalSteps}`}</p>
          <h2 className="text-4xl">Start the conversation.</h2>
          <p className="text-md text-gray-600">Talent are looking for:</p>

          <ul className="list-disc list-inside text-gray-600 text-sm space-y-3 mt-2">
            <li>
              Clear expectations about your task or deliverables
            </li>
            <li>
              The skills required for your work
            </li>
            <li>Good communication</li>
            <li>Details about how you or your team like to work</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 space-y-6  mt-6 md:mt-0">
          <p className="mt-4">Describe what you need</p>
          <textarea name="" id="" className="h-32 border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full rounded" placeholder="Already have a description? Paste it here!"></textarea>
        </div>
      </div>
    </>
  );
}

export default JobCreationStep4;
