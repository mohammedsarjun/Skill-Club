"use client";

import { useState, useEffect } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
export default function Otp() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    const expiry = localStorage.getItem("otpExpiry");

    let timer: NodeJS.Timeout;

    if (expiry) {
         const expiryTime = new Date(expiry).getTime();
         console.log(expiryTime)
      const updateCountdown = () => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
        setTimeLeft(diff);

        if (diff === 0) {
          clearInterval(timer);
        }
      };

      updateCountdown();
      timer = setInterval(updateCountdown, 1000);
    }

    return () => clearInterval(timer);
  }, []);

    const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        {/* Signup Card */}
        <div className="flex items-center justify-center">
          <div className="signUp bg-white p-12 rounded-xl shadow-xl w-120 max-w-full h-auto space-y-6 text-center">
            <h2 className="font-bold text-2xl">
              Enter <span className="text-primary">Otp</span> Below
            </h2>

            <p className="text-gray-600 font-medium">Enter Otp:</p>
            <Input className="mx-auto font-bold w-3/4 py-3 text-lg rounded-md border border-gray-300" />
            {timeLeft > 0 ? (
             <p className="text-gray-500 text-sm">OTP expires in: <span className="font-semibold">{formatTime(timeLeft)}</span></p>
            ) : (
              <p style={{ color: "red" }}>OTP expired. Please resend.</p>
            )}

            <Button
              content="Submit Otp"
              type="submit"
              className="mx-auto px-8 py-3 text-lg rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            />

            <p className="text-gray-500 text-sm">Didn't receive the Otp?</p>
            <p className="text-primary font-semibold cursor-pointer hover:underline">
              Resend Otp
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
