"use client";
import React, { useEffect } from "react";
import AuthHeader from "@/components/common/AuthHeader";
import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import GuestGuard from "@/components/GuestGaurd";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <GuestGuard>
      <div className="bg-background min-h-screen">
        <AuthHeader />
        {children}
      </div>
    </GuestGuard>
  );
}
