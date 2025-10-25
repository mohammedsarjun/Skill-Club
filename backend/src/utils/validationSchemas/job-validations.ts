import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdString = z.string().regex(objectIdRegex, 'Invalid ObjectId');

const hourlyRateSchema = z
  .object({
    min: z.number().nonnegative().max(10_000, 'hourlyRate.min too high'),
    max: z.number().nonnegative().max(10_000, 'hourlyRate.max too high').optional(),
  })
  .refine((data) => data.max === undefined || data.max >= data.min, {
    message: 'hourlyRate.max must be >= hourlyRate.min',
    path: ['max'],
  });

const fixedRateSchema = z
  .object({
    min: z.number().nonnegative().max(1_000_000, 'fixedRate.min too high'),
    max: z.number().nonnegative().max(1_000_000, 'fixedRate.max too high').optional(),
  })
  .refine((data) => data.max === undefined || data.max >= data.min, {
    message: 'fixedRate.max must be >= fixedRate.min',
    path: ['max'],
  });

const dateOrStringToDate = z.preprocess((val) => {
  if (!val) return undefined;
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}, z.date().optional());

export const createJobSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
    category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
    specialities: z.array(z.string().min(1).max(50)).min(1).max(3),
    skills: z.array(z.string().min(1).max(50)).min(1).max(10),
    rateType: z.enum(['hourly', 'fixed']),
    hourlyRate: hourlyRateSchema.optional(),
    fixedRate: fixedRateSchema.optional(),
    clientId: objectIdString,
    slots: z.number().int().positive().max(100, 'Too many slots').optional().default(1),
    applyUntil: dateOrStringToDate,
  })
  .superRefine((data, ctx) => {
    if (data.rateType === 'hourly' && !data.hourlyRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'hourlyRate is required when rateType is hourly',
        path: ['hourlyRate'],
      });
    }

    if (data.rateType === 'fixed' && !data.fixedRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'fixedRate is required when rateType is fixed',
        path: ['fixedRate'],
      });
    }

    if (data.applyUntil && data.applyUntil.getTime() <= Date.now()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'applyUntil must be a future date',
        path: ['applyUntil'],
      });
    }
  });



export const updateJobSchema = createJobSchema.partial();

