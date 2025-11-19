// components/Button.js
import React from "react";


type ButtonProps={
  content?:string, 
  type:"button" | "submit" | "reset";
  onClick?: (e: React.FormEvent) => void;     
  color?:  "red" | "green" | "gray"; 
  fullWidth?: boolean;
  rounded?: boolean;
  className?: string; 
  disabled?: boolean; 
}
export default function Button({
  content,       
  type = "button", 
  onClick,         
  color = "green", 
  fullWidth = false, 
  rounded = true,  
  className = "",  
   disabled = false,    
}:ButtonProps) {

  const colors = {
    green: "bg-primary hover:bg-primary-dark text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    gray: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${colors[color] || colors.green} 
        ${fullWidth ? "w-full" : "px-4 py-2"} 
        ${rounded ? "rounded" : ""}
        font-semibold 
        ${className}
        transition duration-200
        ${disabled ? "opacity-50  cursor-not-allowed" : ""} 
      `}
       disabled={disabled} 
      

    >
      {content??""}
    </button>
  );
}
