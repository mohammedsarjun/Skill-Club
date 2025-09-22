// components/AuthGuard.tsx
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/client/profile"); // redirect logged-in users
  }, [user, router]);

  if (user) return null; // prevent flash
  return <>{children}</>;
}
