import { z } from 'zod';

// Reusable date refinements
const isFutureDate = (value: string, field: string) => {
  if (!value) return false;
  const d = new Date(value);
  if (isNaN(d.getTime())) return false;
  return d.getTime() >= Date.now() - 60_000; // allow 1m skew
};

const milestoneSchema = z.object({
  title: z.string().min(3, 'Milestone title too short'),
  amount: z.preprocess(v => (v === '' || v === null ? undefined : Number(v)), z.number().positive('Amount must be > 0')),
  expected_delivery: z.string().refine(v => isFutureDate(v, 'expected_delivery'), 'Delivery date must be a valid future date'),
});

const dayOfWeek = z.enum(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']);
const timeHHmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be HH:mm (24h)');

export const offerSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 chars'),
  description: z.string().min(20, 'Description must be at least 20 chars'),
  payment_type: z.enum(['fixed', 'fixed_with_milestones', 'hourly']),
  budget: z.preprocess(v => (v === '' || v === undefined ? undefined : Number(v)), z.number().positive('Budget must be > 0').optional()),
  currency: z.enum(['USD','EUR','GBP','INR']),
  hourly_rate: z.preprocess(v => (v === '' || v === undefined ? undefined : Number(v)), z.number().positive('Hourly rate must be > 0').optional()),
  estimated_hours_per_week: z.preprocess(v => (v === '' || v === undefined ? undefined : Number(v)), z.number().int().positive('Hours must be > 0').max(168, 'Too many hours').optional()),
  milestones: z.array(milestoneSchema).optional(),
  expected_start_date: z.string().refine(v => isFutureDate(v, 'expected_start_date'), 'Start date must be a valid future date'),
  expected_end_date: z.string().refine(v => isFutureDate(v, 'expected_end_date'), 'End date must be a valid future date'),
  expires_at: z.string().refine(v => isFutureDate(v, 'expires_at'), 'Expiry must be future date/time'),
  communication: z.object({
    preferred_method: z.enum(['chat','video_call','email','mixed']),
    meeting_frequency: z.enum(['daily','weekly','monthly']).optional(),
    meeting_day_of_week: dayOfWeek.optional(),
    meeting_day_of_month: z.number().int().min(1).max(31).optional(),
    meeting_time_utc: timeHHmm.optional(),
  }),
  reporting: z.object({
    frequency: z.enum(['daily','weekly','monthly']),
    due_time_utc: timeHHmm,
    due_day_of_week: dayOfWeek.optional(),
    due_day_of_month: z.number().int().min(1).max(31).optional(),
    format: z.enum(['text_with_attachments','text_only','video'])
  }),
  reference_files: z.array(z.object({
    file_name: z.string().min(1),
    file_url: z.string().url(),
  })).max(10, 'Max 10 files'),
  reference_links: z.array(z.object({
    description: z.string().min(3),
    link: z.string().url('Invalid URL')
  })).max(10, 'Max 10 links'),
  status: z.enum(['pending','accepted','rejected','withdrawn'])
}).superRefine((data, ctx) => {
  // Relationship validations
  if (data.payment_type !== 'hourly' && !data.budget) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['budget'], message: 'Budget required for non-hourly offers' });
  }
  if (data.payment_type === 'hourly' && !data.hourly_rate) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['hourly_rate'], message: 'Hourly rate required' });
  }
  if (data.payment_type === 'fixed_with_milestones') {
    if (!data.milestones || data.milestones.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['milestones'], message: 'At least one milestone required' });
    } else {
      const total = data.milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
      if (data.budget && total > data.budget) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['milestones'], message: 'Milestone total exceeds budget' });
      }
      if (data.budget && total < data.budget) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['milestones'], message: 'Milestone total less than budget' });
      }
    }
  }
  const start = new Date(data.expected_start_date).getTime();
  const end = new Date(data.expected_end_date).getTime();
  if (!isNaN(start) && !isNaN(end) && end < start) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['expected_end_date'], message: 'End date must be after start date' });
  }
  const expiry = new Date(data.expires_at).getTime();
  if (!isNaN(end) && !isNaN(expiry) && expiry > start) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['expires_at'], message: 'Expiry must be before start date' });
  }

  // When video_call is selected, validate meeting fields according to frequency
  if (data.communication.preferred_method === 'video_call') {
    const freq = data.communication.meeting_frequency;
    if (!freq) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['communication.meeting_frequency'], message: 'Meeting frequency is required' });
    }
    if (!data.communication.meeting_time_utc) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['communication.meeting_time_utc'], message: 'Meeting time (UTC) is required' });
    }
    if (freq === 'weekly' && !data.communication.meeting_day_of_week) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['communication.meeting_day_of_week'], message: 'Meeting day of week is required for weekly meetings' });
    }
    if (freq === 'monthly' && !data.communication.meeting_day_of_month) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['communication.meeting_day_of_month'], message: 'Meeting day of month is required for monthly meetings' });
    }
  }

  // Reporting day constraints based on frequency
  if (data.reporting.frequency === 'weekly' && !data.reporting.due_day_of_week) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['reporting.due_day_of_week'], message: 'Due day of week required for weekly reporting' });
  }
  if (data.reporting.frequency === 'monthly' && !data.reporting.due_day_of_month) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['reporting.due_day_of_month'], message: 'Due day of month required for monthly reporting' });
  }
});

export type OfferSchemaType = z.infer<typeof offerSchema>;

export function validateOffer(payload: any) {
  const parsed = offerSchema.safeParse(payload);
  if (parsed.success) return { success: true, data: parsed.data, errors: {} };
  const fieldErrors: Record<string,string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join('.') || 'form';
    // accumulate only first error per field
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { success: false, errors: fieldErrors };
}
