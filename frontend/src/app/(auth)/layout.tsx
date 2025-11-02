"use client";
import React, { useEffect } from "react";
import AuthHeader from "@/components/common/AuthHeader";
import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  usePreventBackAfterLogout();

  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    // Prevent back button caching
    window.history.replaceState(null, "", window.location.pathname);

    // Detect if user came via back button
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was loaded from bfcache, check if user is logged in

        if (user) {
          router.push("/client"); // or check role and redirect accordingly
          router.refresh();
        }
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [router]);

  return (
    <div className="bg-background min-h-screen">
      <AuthHeader />
      {children}
    </div>
  );
}
