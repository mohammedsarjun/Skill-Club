import { z } from 'zod';
// 🔹 Individual field schemas
export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes',
  );
export const emailSchema = z.string().email('Invalid email format');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[!@#$%^&*]/, 'Password must contain a special character');
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{10,15}$/, 'Phone number must be 10–15 digits and can start with +');
// 🔹 Signup schema (combining fields)
export const signupSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must accept the agreement',
  }),
});
// 🔹 Login schema (simpler)
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
//# sourceMappingURL=authValidations.js.map
