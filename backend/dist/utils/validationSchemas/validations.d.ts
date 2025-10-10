import z from "zod";
export declare const portfolioSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    role: z.ZodString;
    projectUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    githubUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    technologies: z.ZodArray<z.ZodString>;
    images: z.ZodArray<z.ZodOptional<z.ZodCustom<File, File>>>;
    video: z.ZodCustom<File, File>;
}, z.z.core.$strip>;
//# sourceMappingURL=validations.d.ts.map