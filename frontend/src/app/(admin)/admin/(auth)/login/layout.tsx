import React from "react";
import AuthHeader from "@/components/common/AuthHeader";

import AdminAuthGuard from "@/components/AdminAuthGaurd";


type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {


  return (
<AdminAuthGuard>

          <AuthHeader />
          {children}
</AdminAuthGuard>
    
  );
}