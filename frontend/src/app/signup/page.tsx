"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Checkbox from "@/components/common/CheckBox";
import Image from "next/image";
import { SignUpData } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/authApi";
import { handleSignUpSubmit } from "@/utils/validation";

import { handleInputChange, handleCheckBox } from "@/utils/formHandlers";

export default function SignUp() {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone:"",
    agreement: false,
  });

  const [errors, setErrors] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    password: "",
    agreement: false,
  });

  function handleSubmit(e: React.FormEvent){
       const success=handleSignUpSubmit(e,formData,setErrors)
       if(success){
        authApi.signUp(formData);
       }
  }

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col  items-center mb-6">
          <Image
            src="/images/site logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="leading-8"
          />
          <h2 className="text-2xl font-bold ml-3">Sign up</h2>
        </div>

        {/* Signup Card */}
        <div className="signUp bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
          {/* Google signup (neutral color) */}
          <div className="google-signup flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded cursor-pointer">
            <Image
              src="/icons/google.png"
              alt="google"
              width={20}
              height={20}
            />
            <span>Continue With Google</span>
          </div>

          {/* Separator */}
          <div className="flex items-center text-gray-400">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Input fields */}
          <form className="space-y-4">
            <div className="flex gap-4">
              <Input
                name="firstName"
                type="text"
                fullWidth={true}
                placeholder="First Name"
                className="leading-5"
                onChange={(e) => handleInputChange(e, setErrors, setFormData)}
                error={errors.firstName}
              />
              <Input
                name="lastName"
                type="text"
                fullWidth={true}
                placeholder="Last Name"
                className="leading-5"
                onChange={(e) => handleInputChange(e, setErrors, setFormData)}
                error={errors.lastName}
              />
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="leading-5"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              error={errors.email}
            />

             <Input
              name="phone"
              type="number"
              placeholder="Phone"
              className="leading-5"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              error={errors.phone}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="leading-5"
              onChange={(e) => handleInputChange(e, setErrors, setFormData)}
              error={errors.password}
            />

            <Checkbox
              name="agreement"
              error={errors.agreement}
              onChange={(e) =>
                handleCheckBox("agreement", e, setFormData, setErrors)
              }
              label={
                <span>
                  I agree to the Skill Club{" "}
                  <a
                    href="/user-agreement"
                    className="text-blue-600 hover:underline"
                  >
                    User Agreement
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              }
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                content="JOIN SKILL CLUB"
                onClick={(e)=>handleSubmit(e)}
              />
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an Account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => route.push("/login")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
