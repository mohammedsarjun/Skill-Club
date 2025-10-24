import { z } from 'zod';
export declare const categoryValidationSchema: z.ZodObject<
  {
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
      list: 'list';
      unlist: 'unlist';
    }>;
  },
  z.core.$strip
>;
export type CategoryDTO = z.infer<typeof categoryValidationSchema>;
//# sourceMappingURL=categoryValidation.d.ts.map
