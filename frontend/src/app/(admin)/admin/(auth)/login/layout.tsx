import React from "react";
import AuthHeader from "@/components/common/AuthHeader";

import AdminAuthGuard from "@/components/AdminAuthGaurd";
import GuestGuard from "@/components/GuestGaurd";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <GuestGuard>
      <AuthHeader />
      {children}
      </GuestGuard>
    </>
    
  );
}
