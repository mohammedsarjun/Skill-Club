"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaLock,
  FaCamera,
} from "react-icons/fa";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { userApi } from "@/api/userApi";
import toast from "react-hot-toast";
import { changeEmailSchema, emailSchema } from "@/utils/validation";
import DynamicFormModal from "@/components/common/Form";
import { authApi } from "@/api/authApi";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

export default function PersonalInformation() {
  useEffect(() => {
    async function fetchUserProfile() {
      const response = await userApi.getProfile();

      if (response.success) {
        console.log(response);

        setProfileData((prev) => ({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone:
            response.data.phone != 0
              ? response.data.phone
              : "Phone Number Not Added",
          dob: response?.data?.dob ? response?.data?.dob : "Dob Not Added",
        }));
      } else {
        toast.error(response.message);
      }
    }

    fetchUserProfile();
  }, []);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeModal, setActiveModal] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleEmailChange = () => {
    setActiveModal("email");
    setOpenModal(true);
  };

  const handleOnSubmit = async (data: any, mode: string) => {
    if (activeModal == "email") {
     
     const response = await  authApi.verifyPassword(data.password)

     if(response.success){
        sessionStorage.setItem("newEmail",data.email)
     }else{
        toast.error(response.message)
     }
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Personal Information
          </h2>
          <p className="text-slate-600">
            Update your personal details and profile picture
          </p>
        </div>
        {!isEditing ? (
          <Button
            content="Edit Profile"
            type="button"
            onClick={() => setIsEditing(true)}
          ></Button>
        ) : (
          <div className="flex gap-2">
            <Button
              content="Save Changes"
              type="button"
              onClick={handleSave}
            ></Button>
            <Button
              content="Cancel"
              type="button"
              onClick={handleCancel}
            ></Button>
          </div>
        )}
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-slate-700">
              First Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Input
                name="firstName"
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-slate-700">
              Last Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Input
                name="lastName"
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-slate-700">
            Email Address
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Input
                name="email"
                type="email"
                value={profileData.email}
                disabled
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              content="Change Email"
              onClick={handleEmailChange}
            ></Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-slate-700">
            Phone Number
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <Input
              name="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="dob" className="text-slate-700">
            Date of Birth
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <Input
              name="dob"
              type="date"
              value={profileData.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Security</h3>
        <Button
          content="Change Password"
          type="button"
          className="gap-2"
        ></Button>
      </div>

      {openModal && (
        <DynamicFormModal
          title={activeModal == "email" ? "Change Email" : "Change Email"}
          fields={
            activeModal === "email"
              ? [
                  {
                    name: "newEmail",
                    type: "text",
                    placeholder: "Enter new email",
                    label: "New Email",
                  },
                  {
                    name: "password",
                    type: "text",
                    placeholder: "Enter Current Password",
                    label: "Current Password",
                  },
                ]
              : []
          }
          onSubmit={handleOnSubmit}
          onClose={() => setOpenModal(false)}
          validationSchema={activeModal == "email" ? changeEmailSchema : null}
        />
      )}
    </div>
  );
}
