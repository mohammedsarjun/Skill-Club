import React from "react";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";
import Script from "next/script";
import { persistor } from "@/store";
import RouteLoader from "../components/common/RouteLoader";
import GlobalSpinner from "@/components/common/Spinner";
import "react-quill-new/dist/quill.snow.css";
import ClientInit from "@/components/UserInit";

type LayoutProps = {
  children: React.ReactNode;
};



export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body className="bg-background min-h-screen">
        
          <Providers>
            <RouteLoader/>
            <GlobalSpinner/>
            {children}
            <script
              src="https://accounts.google.com/gsi/client"
              async
              defer
            ></script>
            <Toaster position="top-right" reverseOrder={false} />
          </Providers>
        
      </body>
    </html>
  );
}
