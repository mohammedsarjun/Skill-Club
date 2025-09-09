import React, { useState } from "react";

type InputProps = {
  type?: string;                   
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  rounded?: boolean;
  className?: string;
  error?: string|number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string;
};

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  fullWidth = true,
  rounded = true,
  className = "",
  error = "",
  onBlur,
  name = ""
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="flex flex-col">
      {/* Input + Button wrapper */}
      <div className="relative w-full">
        <input
          type={isPasswordType && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={`
            ${fullWidth ? "w-full" : "w-auto"}
            ${rounded ? "rounded" : ""}
            border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400
            ${isPasswordType ? "pr-12" : ""}
            ${className}
          `}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Error message stays below input, not affecting button */}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
