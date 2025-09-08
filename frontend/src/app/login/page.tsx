"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Checkbox from "@/components/common/CheckBox";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const route = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/site logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="leading-8"
          />
          <h2 className="text-2xl font-bold ml-3">Welcome Back</h2>
        </div>

        {/* Login Card */}
        <div className="signUp bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
          {/* Google login (neutral color) */}
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
            <Input placeholder="Email" className="leading-5"/>
            <Input placeholder="Password" className="leading-5"/>

            <div className="flex justify-between items-center">
              <Checkbox label="Remember me" />
              <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </a>
            </div>

            <div className="flex justify-center">
              <Button type="submit" content="LOGIN" />
            </div>
          </form>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500 mt-4" >
            Don't have an Account?{" "}
            <span className="text-blue-700 cursor-pointer" onClick={()=>route.push("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </>
  );
}
