import { z } from 'zod';
export declare const nameSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const phoneSchema: z.ZodString;
export declare const signupSchema: z.ZodObject<
  {
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    agreement: z.ZodBoolean;
  },
  z.core.$strip
>;
export declare const loginSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodBoolean;
  },
  z.core.$strip
>;
export declare const verifyOtpSchema: z.ZodObject<
  {
    email: z.ZodString;
    otp: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=authValidations.d.ts.map
