"use client";
import { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import DynamicFormModal from "@/components/common/Form";
import JobCreationStep1 from "@/components/client/job-creation/JobCreationStep1";
import JobCreationStep2 from "@/components/client/job-creation/JobCreationStep2";
import JobCreationStep3 from "@/components/client/job-creation/JobCreationStep3";
import JobCreationStep4 from "@/components/client/job-creation/JobCreationStep4";

function CreateJobPost() {
  const [categories, setCategories] = useState([
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "UI/UX Design",
    "Mobile App Development",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  // Map of step number to component
  const stepComponents: Record<number, any> = {
    1: JobCreationStep1,
    2: JobCreationStep2, // Add more steps here
    3: JobCreationStep3,
    4: JobCreationStep4,
  };

  const CurrentStepComponent = stepComponents[step]; // get the current step component

  return (
    <div>
      {CurrentStepComponent && (
        <CurrentStepComponent step={step} totalSteps={totalSteps} />
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2 sm:gap-0">
        <Button
          content="Back"
          type="button"
          color="gray"
          onClick={() => step > 1 && setStep(step - 1)}
        />
        <Button
          content="Next"
          type="button"
          onClick={() => setStep(step + 1)}
        />
      </div>
    </div>
  );
}

export default CreateJobPost;
