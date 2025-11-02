"use client"
import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import AuthGuard from "@/components/AuthGaurd";
import FreelancerHeader from "@/components/freelancer/Header";
import VerifyUser from "@/components/verifyUser";
import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  usePreventBackAfterLogout();
  return (
    <div className="bg-background min-h-screen">
      <FreelancerHeader></FreelancerHeader>
      {children}
    </div>
  );
}
