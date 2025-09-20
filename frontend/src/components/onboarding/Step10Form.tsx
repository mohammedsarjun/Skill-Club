import React, { useState } from "react";
import Button from "../common/Button";
import Image from "next/image";

interface StepSevenProps {
  onBack: () => void;
  onNext: (data: {
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: number;
    logo: string;
  }) => void;
}

export default function StepSevenForm({ onBack, onNext }: StepSevenProps) {
  const [logo, setLogo] = useState("/images/site logo.png");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState<number | undefined>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const handleNext = () => {
    onNext({
      country,
      streetAddress,
      city,
      state,
      zipCode: zipCode || 0,
      logo,
    });
  };

  return (
    <div>
      {/* Step Indicator */}
      <p className="text-gray-500">9/9</p>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        A few last details, then you can check and publish your profile.
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        A professional photo helps you build trust with your clients. To keep
        things safe and simple, they’ll pay you through us - which is why we
        need your personal information.
      </p>

      <div className="flex gap-8 p-6 rounded-2xl">
        {/* Left Side - Profile Photo */}
        <div className="flex flex-col items-center gap-4 w-1/4">
          <Image
            src={logo}
            alt="profileImg"
            width={100}
            height={100}
            className="rounded-full object-cover border border-gray-300"
          />
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              type="button"
              content="+ Upload Photo"
              onClick={handleUploadClick}
            />
          </label>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Country*</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Street Address*</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* City, State, Zip in one row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">City*</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">State*</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Zip*</label>
              <input
                type="number"
                value={zipCode ?? ""}
                onChange={(e) => setZipCode(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          content="Back"
          type="submit"
          color="gray"
          onClick={onBack}
        ></Button>
        <Button content="Next" type="submit" onClick={handleNext}></Button>
      </div>
    </div>
  );
}
