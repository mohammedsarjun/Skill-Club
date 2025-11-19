import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import AuthGuard from "@/components/ClientAuthGaurd";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {

  return (


      <div className="bg-background min-h-screen">
        <AuthHeader />
        {children}
      </div>

  );
}
