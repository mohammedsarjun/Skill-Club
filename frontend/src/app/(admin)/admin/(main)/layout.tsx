"use client";

import React, { Children, ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ for active route detection
import {
  FaUser,
  FaBars,
  FaHome,
  FaUsers,
  FaCog,
  FaBookOpen,
  FaBriefcase,
} from "react-icons/fa";
import Image from "next/image";
import AdminAuthGuard from "@/components/AdminAuthGaurd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser, clearUser } from "@/store/slices/authSlice";
import { adminAuthApi } from "@/api/adminAuthApi";
import VerifyAuthAdmin from "@/components/verifyAdmin";
type LayoutProps = {
  children: ReactNode;
};

function AdminLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // ✅ get current path
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await adminAuthApi.logout();
      dispatch(clearUser());
      localStorage.removeItem("user");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Helper function to style active link
  const linkClasses = (path: string) =>
    `group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      pathname === path
        ? "bg-gray-900 text-white"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white h-16 flex items-center justify-between px-6 shadow-lg border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FaBars className="w-5 h-5" />
          </button>
          <div className="text-gray-900">
            <Image
              src={"/images/site logo.png"}
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Admin</p>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:scale-105">
              <FaUser className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a
                  onClick={handleLogout}
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0  w-64 bg-white text-gray-900 h-full shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="p-6">
            <div className="hidden lg:flex items-center space-x-2 mb-8">
              <FaBars className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Navigation
              </span>
            </div>

            <nav className="space-y-2">
              <Link href="/admin" className={linkClasses("/admin")}>
                <FaHome className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/admin/categories-skills"
                className={linkClasses("/admin/categories-skills")}
              >
                <FaBookOpen className="w-5 h-5" />
                <span className="font-medium">Categories</span>
              </Link>

              <Link
                href="/admin/jobs"
                className={linkClasses("/admin/skills")}
              >
                <FaBriefcase className="w-5 h-5" />
                <span className="font-medium">Jobs</span>
              </Link>

              <Link href="/admin/users" className={linkClasses("/admin/users")}>
                <FaUsers className="w-5 h-5" />
                <span className="font-medium">User Management</span>
              </Link>

              <Link
                href="/admin/settings"
                className={linkClasses("/admin/settings")}
              >
                <FaCog className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 lg:ml-0">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminPageLayout({ children }: LayoutProps) {
  return (
    <VerifyAuthAdmin>
      <AdminLayout>{children}</AdminLayout>
    </VerifyAuthAdmin>
  );
}
