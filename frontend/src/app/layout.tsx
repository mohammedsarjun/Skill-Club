import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";
import './globals.css'
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body className="bg-background min-h-screen">
        <AuthHeader/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
