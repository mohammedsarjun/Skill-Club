"use client"

import { useParams, useRouter } from "next/navigation";
import Step1Form from "@/components/onboarding/Step1Form";
import Step2Form from "@/components/onboarding/Step2Form"
import Step3Form from "@/components/onboarding/Step3Form"
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
    <Step3Form onBack={()=>1} onNext={()=>2}></Step3Form>
  )
//    ) <StepComponent onNext={handleNext} />;
}
