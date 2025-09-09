import { z } from "zod";
import { SignUpData } from "@/api/authApi";
export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

export const emailSchema = z
  .string()
  .email("Invalid email format");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[!@#$%^&*]/, "Password must contain a special character");

export const confirmPasswordSchema = (password: string) =>
  z.string().refine((val) => val === password, {
    message: "Passwords do not match",
  });


  //signup validation
  export const handleSignUpSubmit = (e: React.FormEvent,formData:SignUpData,setErrors:React.Dispatch<React.SetStateAction<SignUpData>>) => {
    e.preventDefault();

    const newErrors: Record<string, string | null> = {};
    const firstNameError = nameSchema.safeParse(formData.firstName);
    const lastNameError= nameSchema.safeParse(formData.lastName);
    const emailError=emailSchema.safeParse(formData.email)
    const passwordError=passwordSchema.safeParse(formData.password)

    if (!firstNameError.success) {
        newErrors.firstName=firstNameError.error.issues[0].message;
    } 

    if (!lastNameError.success) {
      newErrors.lastName =lastNameError.error.issues[0].message;
    }

    if (!emailError.success) {
      newErrors.email = emailError.error.issues[0].message;
    }

    if (!passwordError.success) {
      newErrors.password = passwordError.error.issues[0].message;
    }

    if (!formData.agreement) {
      newErrors.agreement =  "You must agree to the terms to continue.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length === 0) return true
    return false
      
  };
