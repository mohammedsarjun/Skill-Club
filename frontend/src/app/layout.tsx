import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";
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
          {children}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
          <Toaster position="top-right" reverseOrder={false} />

        </Providers>
      </body>
      
    </html>
    
  );
}
