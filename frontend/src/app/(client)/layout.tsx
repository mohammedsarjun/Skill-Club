"use client";
import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import AuthGuard from "@/components/ClientAuthGaurd";
import ClientHeader from "@/components/client/Header";
import VerifyUser from "@/components/verifyUser";
import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";
import ClientAuthGuard from "@/components/ClientAuthGaurd";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {

  return (
    <ClientAuthGuard>
    <div className="bg-background min-h-screen">
      <ClientHeader />
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
    </ClientAuthGuard>
  );
}
