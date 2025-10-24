import { z } from 'zod';
export declare const specialityValidationSchema: z.ZodObject<
  {
    name: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<{
      list: 'list';
      unlist: 'unlist';
    }>;
  },
  z.core.$strip
>;
//# sourceMappingURL=specialityValidations.d.ts.map
