import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Input from "../common/Input";
interface StepFourProps {
  onBack: () => void;
  onNext: (data:any) => void;
}





export default function StepFourForm({ onBack, onNext }: StepFourProps) {
 
  const [formData,setFormData]=useState()
    function handleNext() {
    onNext({ professionalRole:formData });
  }
  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">3/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Got it. Now, add a title to tell the world what you do.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        It’s the very first thing clients see, so make it count. Stand out by
        describing your expertise in your own words.
      </p>

       <p className="text-md font-semibold mb-2">
        Your Professional Role
      </p>

      <Input type="text" onChange={(e:any)=>setFormData(e.target.value)} placeholder="Example:Web,App & Software Dev" name="professionalRole"></Input>


      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          content="Back"
          type="submit"
          color="gray"
          onClick={onBack}
        ></Button>
        <Button content="Next" type="submit" onClick={handleNext}></Button>
      </div>
    </div>
  );
}
