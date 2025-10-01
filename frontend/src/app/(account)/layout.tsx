import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import AuthGuard from "@/components/AuthGaurd";
import ClientHeader from "@/components/client/Header";


type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {


  return (
<AuthGuard>
      <div className="bg-background min-h-screen">
          <ClientHeader />
          {children}
      </div>
</AuthGuard>
    
  );
}