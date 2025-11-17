"use client";
import { authApi } from "@/api/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { FaUser, FaChevronDown, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { userApi } from "@/api/userApi";
import { useState } from "react";

export default function ClientHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHireTalentOpen, setIsHireTalentOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const respone = await authApi.logout();
      if (respone.success) {
        dispatch(setUser(null));
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSwitchAccount = async () => {
    const response = await userApi.switchAccount();

    if (response.success) {
      dispatch(setUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/freelancer/profile");
    } else {
      router.push("/onboarding/freelancer/0");
    }
  };

  const handleOpenAccountSettings = async () => {
    router.replace("/account/settings");
  };

  return (
    <div className="header bg-secondary h-auto min-h-18">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Image
          onClick={() => router.push("/client")}
          src="/images/site logo.png"
          alt="Site Logo"
          width={150}
          height={50}
          className="object-contain cursor-pointer"
        />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          {/* Hire Talent Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1 text-black hover:text-gray-700">
              <span>Hire Talent</span>
              <FaChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                onClick={() => router.push("/client/jobs")}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
              >
                Jobs
              </a>
              <a
                onClick={() => router.push("/client/jobs/create")}
                className="cursor-pointer block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Post Job
              </a>
              <a
                onClick={() => router.push("/client/offers")}
                className="cursor-pointer block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Offers
              </a>
              <a
                onClick={() => router.push("/client/freelancers")}
                className=" cursor-pointer block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Search for Talent
              </a>
              <a
                href="#"
                className="cursor-pointer block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Talent You've Hired
              </a>
              <a
                onClick={() => router.push("/client/saved-freelancer")}
                className="cursor-pointer block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Talent You've Saved
              </a>
            </div>
          </div>

          <a href="#" className="text-black hover:text-gray-700">
            Finance
          </a>
          <a href="#" className="text-black hover:text-gray-700">
            Contract
          </a>
          <a href="#" className="text-black hover:text-gray-700">
            Meetings
          </a>
          <a href="#" className="text-black hover:text-gray-700">
            Messages
          </a>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
          />

          {/* Notification */}
          <button className="relative text-black hover:text-gray-700">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:scale-105">
              <FaUser className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={() => router.push("/client/profile")}
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={handleOpenAccountSettings}
                >
                  Account Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={handleSwitchAccount}
                >
                  Switch Account <br />
                  <span className="text-xs text-gray-500">Freelancer</span>
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

        {/* Mobile Right Side */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Search Input Mobile */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black text-sm"
          />

          {/* Notification */}
          <button className="relative text-black hover:text-gray-700">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Icon Mobile */}
          <div className="relative group">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-700">
              <FaUser className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={() => router.push("/client/profile")}
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={handleOpenAccountSettings}
                >
                  Account Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                  onClick={handleSwitchAccount}
                >
                  Switch Account <br />
                  <span className="text-xs text-gray-500">Freelancer</span>
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black hover:text-gray-700 p-2"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {/* Hire Talent Dropdown Mobile */}
            <div className="border-b border-gray-200 pb-2">
              <button
                onClick={() => setIsHireTalentOpen(!isHireTalentOpen)}
                className="flex items-center justify-between w-full text-black hover:text-gray-700 py-2"
              >
                <span>Hire Talent</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isHireTalentOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isHireTalentOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <a
                    onClick={() => router.push("/client/jobs")}
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Jobs
                  </a>
                  <a
                    onClick={() => router.push("/client/jobs/create")}
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Post Job
                  </a>
                  <a
                    onClick={() => router.push("/client/offers")}
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Offers
                  </a>
                  <a
                    onClick={() => router.push("/client/talent/search")}
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Search for Talent
                  </a>
                  <a
                    href="#"
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Talent You've Hired
                  </a>
                  <a
                      onClick={() => router.push("/client/saved-freelancer")}
                    className="block py-2 text-sm text-black hover:text-gray-700"
                  >
                    Talent You've Saved
                  </a>
                </div>
              )}
            </div>

            {/* Other Nav Items Mobile */}
            <a
              href="#"
              className="block py-2 text-black hover:text-gray-700 border-b border-gray-200"
            >
              Finance
            </a>
            <a
              href="#"
              className="block py-2 text-black hover:text-gray-700 border-b border-gray-200"
            >
              Contract
            </a>
            <a
              href="#"
              className="block py-2 text-black hover:text-gray-700 border-b border-gray-200"
            >
              Meetings
            </a>
            <a
              href="#"
              className="block py-2 text-black hover:text-gray-700 border-b border-gray-200"
            >
              Messages
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
