import { z } from "zod";
export declare const skillSchema: z.ZodObject<{
    name: z.ZodString;
    specialties: z.ZodArray<z.ZodString>;
    status: z.ZodEnum<{
        list: "list";
        unlist: "unlist";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=skillValidation.d.ts.map