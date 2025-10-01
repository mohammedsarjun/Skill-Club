"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)

  const router = useRouter();

  useEffect(() => {
    if (user?.activeRole) {
      if (user.activeRole === "admin") router.replace("/admin/categories-skills");
      else if (user.activeRole === "freelancer") router.replace("/freelancer/profile");
      else if (user.activeRole === "client") router.replace("/client/profile");
    }
  }, [user, router]);

  if (user?.activeRole) return null;
  return <>{children}</>;
}
