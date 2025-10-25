"use client";

import { authApi } from "@/api/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { FaUser } from "react-icons/fa";
import { userApi } from "@/api/userApi";
import toast from "react-hot-toast";

export default function FreelancerHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenAccountSettings = async () => {
    router.replace("/account/settings");
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(setUser(null));
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSwitchAccount = async () => {
    const response = await userApi.switchAccount();

    if (response.success) {
      dispatch(setUser(response.data));
      router.push("/client");
    } else {
      router.replace("/onboarding/client");
    }
    // router.push("/freelancer"); // replace with the actual route for switching account
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
      <div className="relative group">
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:scale-105">
          <FaUser className="w-5 h-5 text-white" />
        </div>
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/client/profile")}
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={handleOpenAccountSettings}
            >
              Account Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={handleSwitchAccount}
            >
              Switch Account <br />
              <span className="text-xs text-gray-500">Client</span>
            </a>

            <hr className="my-1" />
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
