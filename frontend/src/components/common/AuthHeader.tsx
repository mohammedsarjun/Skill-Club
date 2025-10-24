"use client";

import { authApi } from "@/api/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, UseDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
export default function AuthHeader() {
  const router = useRouter();
  const dispatch=useDispatch()
  const handleLogout = async () => {
    try {

      authApi.logout()
      dispatch(setUser(null))
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="header bg-secondary h-18 flex items-center justify-between px-4">
      {/* Logo */}
      <Image
        src="/images/site logo.png"
        alt="Site Logo"
        width={150}
        height={50}
        className="object-contain"
      />


    </div>
  );
}
