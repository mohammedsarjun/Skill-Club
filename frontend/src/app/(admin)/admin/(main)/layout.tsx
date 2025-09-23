"use client"

import React, { ReactNode, useState } from 'react';
import { 
  FaUser,       // User
  FaBars,       // Menu
  FaHome,       // Home
  FaUsers,      // Users
  FaCog,        // Settings
  FaBookOpen,   // BookOpen
  FaAward       // Award
} from 'react-icons/fa';
import Image from 'next/image';
type LayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white h-16 flex items-center justify-between px-6 shadow-lg border-b border-gray-200">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FaBars className="w-5 h-5" />
          </button>
        
          <div className="text-gray-900">
           <Image src={"/images/site logo.png"} alt='logo' width={100} height={100}/>
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
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Account
                </a>
                <hr className="my-1" />
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white text-gray-900 h-full shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            {/* Close button for mobile */}
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <div className="flex items-center space-x-2">
                <FaBars className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Navigation
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2 mb-8">
              <FaBars className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Navigation
              </span>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-900 text-white transition-all duration-200">
                <FaHome className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </a>
              
              <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <FaBookOpen className="w-5 h-5" />
                <span className="font-medium">Categories</span>
              </a>
              
              <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <FaAward className="w-5 h-5" />
                <span className="font-medium">Skills</span>
              </a>
              
              <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <FaUsers className="w-5 h-5" />
                <span className="font-medium">User Management</span>
              </a>
              
              <a href="#" className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <FaCog className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </a>
            </nav>
          </div>
          
          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 text-gray-500">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">System Status</p>
                <p className="text-xs text-green-400">All systems operational</p>
              </div>
            </div>
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
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}