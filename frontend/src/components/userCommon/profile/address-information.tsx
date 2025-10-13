"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { userApi } from "@/api/userApi";
import toast from "react-hot-toast";

interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function AddressInformation() {
  useEffect(() => {
    async function fetchUserProfile() {
      const response = await userApi.getAddress();

      if (response.success) {
        setAddressData((prev) => ({
          street: response.data.streetAddress,
          city: response.data.city,
          state: response.data.state,
          zipCode: response.data.zipCode,
          country: response.data.country,
        }));
      } else {
        toast.error(response.message);
      }
    }

    fetchUserProfile();
  }, []);
  const [addressData, setAddressData] = useState<AddressData>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Address</h2>
  
        </div>
        {!isEditing ? (
          <Button
            type="button"
            content="Edit Address"
            onClick={() => setIsEditing(true)}
          ></Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              content="Save Changes"
              onClick={handleSave}
            ></Button>
            <Button
              type="button"
              content="Cancel"
              onClick={handleCancel}
            ></Button>
          </div>
        )}
      </div>

      <div className="mb-8 pb-8 border-b border-slate-200">
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <FaHome className="w-5 h-5 text-slate-600 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Current Address
            </h3>
            <p className="text-slate-600 text-sm">
              {addressData.street}
              <br />
              {addressData.city}, {addressData.state} {addressData.zipCode}
              <br />
              {addressData.country}
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="street" className="text-slate-700">
            Street Address
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <Input
              name="street"
              type="text"
              value={addressData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              disabled={!isEditing}
              className="pl-10"
              placeholder="123 Main Street"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="city" className="text-slate-700">
              City
            </label>
            <Input
              name="city"
              type="text"
              value={addressData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!isEditing}
              placeholder="New York"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="state" className="text-slate-700">
              State / Province
            </label>
            <Input
              name="state"
              type="text"
              value={addressData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled={!isEditing}
              placeholder="NY"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="zipCode" className="text-slate-700">
              ZIP / Postal Code
            </label>
            <Input
              name="zipCode"
              type="text"
              value={addressData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              disabled={!isEditing}
              placeholder="10001"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="text-slate-700">
              Country
            </label>
            <Input
              name="country"
              type="text"
              value={addressData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={!isEditing}
              placeholder="United States"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
