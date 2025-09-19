import { z } from "zod";
import { SignUpData } from "@/api/authApi";
export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    "Name can only contain letters, spaces, hyphens, and apostrophes"
  );

export const emailSchema = z.string().email("Invalid email format");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[!@#$%^&*]/, "Password must contain a special character");

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\+?[0-9]{10,15}$/,
    "Phone number must be 10–15 digits and can start with +"
  );

//signup validation
export const handleSignUpSubmit = (
  e: React.FormEvent,
  formData: SignUpData,
  setErrors: React.Dispatch<React.SetStateAction<SignUpData>>
) => {
  e.preventDefault();

  const newErrors: Record<string, string | null> = {};
  const firstNameError = nameSchema.safeParse(formData.firstName);
  const lastNameError = nameSchema.safeParse(formData.lastName);
  const emailError = emailSchema.safeParse(formData.email);
  const passwordError = passwordSchema.safeParse(formData.password);
  const phoneError = phoneSchema.safeParse(formData.phone);
  if (!firstNameError.success) {
    newErrors.firstName = firstNameError.error.issues[0].message;
  }

  if (!lastNameError.success) {
    newErrors.lastName = lastNameError.error.issues[0].message;
  }

  if (!emailError.success) {
    newErrors.email = emailError.error.issues[0].message;
  }

  if (!passwordError.success) {
    newErrors.password = passwordError.error.issues[0].message;
  }

  if (!phoneError.success) {
    newErrors.phone = phoneError.error.issues[0].message;
  }

  if (!formData.agreement) {
    newErrors.agreement = "You must agree to the terms to continue.";
  }

  setErrors((prev) => ({ ...prev, ...newErrors }));

  if (Object.keys(newErrors).length === 0) return true;
  return false;
};

export const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z
    .enum(["list", "unlist"])
    .refine((val) => ["list", "unlist"].includes(val), {
      message: "Enter a proper value",
    }),
});

export const specialitySchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),

  category: z.string().nonempty("Category is required"),

  status: z
    .enum(["list", "unlist"])
    .refine((val) => ["list", "unlist"].includes(val), {
      message: "Enter a proper value",
    }),
});
