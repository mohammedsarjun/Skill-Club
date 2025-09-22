"use client";

import { useDispatch, useSelector } from "react-redux";
import { updateFreelancerData } from "@/store/slices/freelancerSlice";
import { RootState } from "@/store/index";

import { useParams, useRouter } from "next/navigation";
import Step1Form from "@/components/onboarding/Step1Form";
import Step2Form from "@/components/onboarding/Step2Form";
import Step3Form from "@/components/onboarding/Step3Form";
import Step4Form from "@/components/onboarding/Step4Form";
import Step5Form from "@/components/onboarding/Step5Form";
import Step6Form from "@/components/onboarding/Step6Form";
import Step7Form from "@/components/onboarding/Step7Form";
import Step8Form from "@/components/onboarding/Step8Form";
import Step9Form from "@/components/onboarding/Step9Form";
import Step10Form from "@/components/onboarding/Step10Form";
import Step11Form from "@/components/onboarding/Step11Form"

const stepComponents: Record<string, any> = {
  "0": Step1Form,
  "1": Step2Form,
  "2": Step3Form,
  "3": Step4Form,
  "4": Step5Form,
  "5": Step6Form,
  "6": Step7Form,
  "7": Step8Form,
  "8": Step9Form,
  "9": Step10Form,
  "10":Step11Form
};

export default function OnboardingStepPage() {
  const { step } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

   const freelancerData = useSelector((state: RootState) => state.freelancer);

  const StepComponent = stepComponents[step as string];

  if (!StepComponent) return <p>Invalid step</p>;

    const handleNext = (stepData: any) => {
    // update Redux store with current step data
    dispatch(updateFreelancerData(stepData));

    // go to next step
    const nextStep = Number(step) + 1;
    router.push(`/onboarding/freelancer/${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = Number(step) - 1;
    if (prevStep >= 0) router.push(`/onboarding/freelancer/${prevStep}`);
  };

  return <StepComponent onNext={handleNext} onBack={handleBack} savedData={freelancerData} />;

}
