import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";
import AuthInitializer from "@/components/AuthInitializer";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body className="bg-background min-h-screen">
        <Providers>
        <AuthInitializer />
        <AuthHeader />
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
