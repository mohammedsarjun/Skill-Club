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
    console.log("rendering")
    if (user) {
      if (user.activeRole == "freelancer") {
        router.replace("/freelancer/profile")
      }else if(user.activeRole=="client"){
       router.replace("/client/profile")
      }else if(user.activeRole=="admin"){
        router.replace("/admin/categories-skills")
      }

    }; // redirect logged-in users
  }, [user, router]);

  if (user) return null; // prevent flash
  return <>{children}</>;
}
