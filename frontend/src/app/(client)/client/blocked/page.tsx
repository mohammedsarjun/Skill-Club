"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaShieldAlt, FaEnvelope } from "react-icons/fa";

import { uploadToCloudinary } from "@/utils/cloudinary";
import { clientActionApi } from "@/api/action/ClientActionApi";
import toast from "react-hot-toast";
import { ClientProfileData } from "@/types/interfaces/IClient";

function ClientProfilePage() {
  const [profileData, setProfileData] = useState<Partial<ClientProfileData>>({
    companyName: "Tech Solutions Inc.",
    description:
      "We are a leading technology company specializing in innovative software solutions for businesses of all sizes. Our team of expert developers and designers work together to create cutting-edge applications that drive growth and efficiency.",
    website: "https://www.techsolutions.com",
  });

  const [originalData, setOriginalData] = useState<ClientProfileData & { logo: string }>({
    companyName: "",
    description: "",
    website: "",
    logo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<string>(
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await clientActionApi.getClientData();
      if (response.success) {
        const data = response.data;
        setProfileData({
          companyName: data.companyName,
          description: data.description,
          website: data.website,
        });
        setLogo(data.logo);
        setOriginalData({
          companyName: data.companyName,
          description: data.description,
          website: data.website,
          logo: data.logo,
        });
      } else {
        toast.error(response.message);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (field: keyof ClientProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

  const handleSave = async () => {
    setIsEditing(false);

    const updatedFields: Partial<ClientProfileData & { logo: string }> = {};

    if (profileData.companyName !== originalData.companyName) updatedFields.companyName = profileData.companyName;
    if (profileData.description !== originalData.description) updatedFields.description = profileData.description;
    if (profileData.website !== originalData.website) updatedFields.website = profileData.website;
    if (logo !== originalData.logo) updatedFields.logo = logo;

    if (Object.keys(updatedFields).length === 0) {
      toast("No changes to save");
      return;
    }

    try {

      const response = await clientActionApi.updateClientData(updatedFields);
      if (response.success) {
        toast.success(response.message);
        setOriginalData({ ...originalData, ...updatedFields });
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      companyName: originalData.companyName,
      description: originalData.description,
      website: originalData.website,
    });
    setLogo(originalData.logo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <FaShieldAlt className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
           Your Client Account Suspended
          </h1>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Your account has been temporarily suspended due to a violation of our terms of service.
            Access to this platform is currently restricted.
          </p>

          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">
              Why was I blocked?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Common reasons include policy violations, suspicious activity, or non-compliance with community guidelines.
            </p>
          </div>

          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        <FaEnvelope className="w-5 h-5" />
            Contact Support
          </button>

          <p className="text-xs text-slate-500 mt-6">
            If you believe this is a mistake, please reach out to our support team for assistance.
          </p>
        </div>
    </div>
  );
}

export default function ClientProfile() {
  return <ClientProfilePage />;
}
