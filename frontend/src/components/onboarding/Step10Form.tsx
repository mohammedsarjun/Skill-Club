import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
interface StepSevenProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepSevenForm({ onBack, onNext }: StepSevenProps) {
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">9/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        A few last details, then you can check and publish your profile.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        A professional photo helps you build trust with your clients. To keep
        things safe and simple, they’ll pay you through us - which is why we
        need your personal information.
      </p>
 
      <div className="flex">
        <div className="">
          <Image
            src={"/images/site logo.png"}
            alt="profileImg"
            width={25}
            height={25}
          ></Image>
         <Button type="button" content="+ Upload Photo"></Button>
        </div>

        <label className="block">Date of Birth</label>
        
        <input type="date" />
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
