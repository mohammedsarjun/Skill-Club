import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import GuestGuard from "@/components/GuestGaurd";
import AuthGuard from "@/components/AuthGaurd";


type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {


  return (
 <AuthGuard>
      <div className="bg-background min-h-screen">
          <AuthHeader />
          {children}
      </div>
 </AuthGuard>
    
  );
}