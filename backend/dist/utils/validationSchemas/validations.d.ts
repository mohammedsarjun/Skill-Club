import z from 'zod';
export declare const portfolioSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    role: z.ZodString;
    projectUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    githubUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    technologies: z.ZodArray<z.ZodString>;
    images: z.ZodArray<z.ZodOptional<z.ZodCustom<import("buffer").File, import("buffer").File>>>;
    video: z.ZodCustom<import("buffer").File, import("buffer").File>;
}, z.core.$strip>;
export declare const educationSchema: z.ZodObject<{
    school: z.ZodString;
    degree: z.ZodString;
    field: z.ZodString;
    startYear: z.ZodString;
    endYear: z.ZodString;
}, z.core.$strip>;
export declare const userProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    dob: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validations.d.ts.map