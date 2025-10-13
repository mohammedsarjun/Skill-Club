import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import AuthGuard from "@/components/AuthGaurd";
import ClientHeader from "@/components/client/Header";
import VerifyUser from "@/components/verifyUser";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <VerifyUser>
      <div className="bg-background min-h-screen">
        <ClientHeader />
        {children}
      </div>
    </VerifyUser>
  );
}
