"use client"

import { useParams, useRouter } from "next/navigation";
import Step1Form from "@/components/onboarding/Step1Form";
import Step2Form from "@/components/onboarding/Step2Form"
import Step3Form from "@/components/onboarding/Step3Form"
import Step4Form from "@/components/onboarding/Step4Form"
import Step5Form from "@/components/onboarding/Step5Form"
import Step6Form from "@/components/onboarding/Step6Form"
import Step7Form from "@/components/onboarding/Step7Form"
import Step8Form from "@/components/onboarding/Step8Form"
import Step9Form from "@/components/onboarding/Step9Form"
import Step10Form from "@/components/onboarding/Step10Form"
// import Step1Form from "@/components/onboarding/Step1Form";
// import Step2Form from "@/components/onboarding/Step2Form";
// ... up to Step7

// const stepComponents: Record<string, any> = {
//   "1": Step1Form,
//   "2": Step2Form,
//   // ...
//   "7": Step7Form,
// };

export default function OnboardingStepPage() {
  const { step } = useParams();
  const router = useRouter();

//   const StepComponent = stepComponents[step as string];

//   if (!StepComponent) {
//     return <p>Invalid step</p>;
//   }

//   function handleNext(data: any) {
//     // save to DB
//     // then go to next step
//     router.push(`/onboarding/freelancer/${Number(step) + 1}`);
//   }

  return(
    <Step10Form onBack={()=>1} onNext={()=>2}></Step10Form>
  )
//    ) <StepComponent onNext={handleNext} />;
}
