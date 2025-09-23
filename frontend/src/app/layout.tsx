import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";
import AuthInitializer from "@/components/AuthInitializer";
import Script from "next/script";
import { persistor } from "@/store";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {


  return (
    <html>
      <body className="bg-background min-h-screen">
   
        <Providers>
          <AuthInitializer />
          {children}
                <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
          <Toaster position="top-right" reverseOrder={false} />
          <Footer />
        </Providers>
      </body>
      
    </html>
    
  );
}
