"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import {
  FaUser,
  FaCamera,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaLock,
} from "react-icons/fa";
import { uploadToCloudinary } from "@/utils/cloudinary";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-01-15",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>("/images/site logo.png");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData, "Avatar:", avatar);
    // Save profile to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset state
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);

      try {
        setUploading(true);
        const uploadedUrl = await uploadToCloudinary(file);
        setAvatar(uploadedUrl);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Failed to upload avatar. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleEmailChange = () => {
    alert("Redirect to secure email change & verification flow.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Avatar Section */}
          <div className="relative bg-gradient-to-r from-primary to-primary-dark p-8 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={avatar}
                  alt="Profile Avatar"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
              >
                <FaCamera className="w-4 h-4" />
              </button>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-white/80">{profileData.email}</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email - Separate Flow */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <button
                    onClick={handleEmailChange}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    Change Email
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={profileData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </form>

            {/* Password */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Security</h4>
              <button className="flex items-center space-x-3 w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <FaLock className="w-5 h-5" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return <ProfilePage />;
}
