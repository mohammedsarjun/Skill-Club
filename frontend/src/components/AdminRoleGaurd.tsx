"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoleGuard({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.activeRole !== "admin") {
      // If user is not logged in or not an admin, redirect to admin login
      router.replace("/admin/login");
    }
  }, [user, router]);

  // Prevent rendering while redirecting
  if (!user || user.activeRole !== "admin") {
    return null;
  }

  return <>{children}</>;
}
