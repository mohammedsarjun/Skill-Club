"use client";
import React, { useState, useRef } from "react";
import { FaBuilding, FaCamera, FaGlobe, FaEdit, FaLock } from "react-icons/fa";
import { uploadToCloudinary } from "@/utils/cloudinary";

interface ClientProfileData {
  companyName: string;
  description: string;
  website: string;
}

function ClientProfilePage() {
  const [profileData, setProfileData] = useState<ClientProfileData>({
    companyName: "Tech Solutions Inc.",
    description:
      "We are a leading technology company specializing in innovative software solutions for businesses of all sizes. Our team of expert developers and designers work together to create cutting-edge applications that drive growth and efficiency.",
    website: "https://www.techsolutions.com",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Company logo upload state
  const [logo, setLogo] = useState<string>(
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ClientProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Client profile saved:", profileData, "Logo:", logo);
    // Save profile + logo to backend here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset logic if needed
  };

  // Logo upload logic
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Show temporary preview
      const previewUrl = URL.createObjectURL(file);
      setLogo(previewUrl);

      try {
        setUploading(true);
        const uploadedUrl = await uploadToCloudinary(file);
        setLogo(uploadedUrl);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Failed to upload logo. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Profile Page
          </h1>
          <p className="text-gray-600">Manage your company information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Logo Section */}
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="object-cover w-full h-full"
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleUploadClick}
                  disabled={uploading}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                >
                  <FaCamera className="w-4 h-4" />
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">
              {profileData.companyName}
            </h2>
            <p className="text-white/80">{profileData.website}</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Company Information
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
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
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <FaEdit className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    value={profileData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    disabled={!isEditing}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    placeholder="Enter company description"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
            </form>
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

export default function ClientProfile() {
  return <ClientProfilePage />;
}
