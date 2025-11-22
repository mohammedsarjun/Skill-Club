import z from "zod";

export const jobTitleSchema = z
  .string()
  .trim()
  .min(5, "Title must be at least 5 characters long")
  .max(100, "Title is too long")
  .refine((val) => val.trim().length > 0, {
    message: "Title cannot be empty or just spaces",
  })
  .refine((val) => !/\s{2,}/.test(val), {
    message: "Title cannot contain multiple consecutive spaces",
  });

export const SelectedSpecialitiesSchema = z
  .array(z.string())
  .min(1, { message: "Select at least one speciality." })
  .max(3, { message: "Select at most 3 specialities." });

export function createHourlyBudgetSchema(rateToUSD: number, currencySymbol: string = '$') {

  const toLocal = (usd: number) => (rateToUSD > 0 ? usd * rateToUSD : usd);
  const minLocal = toLocal(5);
  const maxLocal = toLocal(999);
  return z
    .object({
      min: z
        .number()
        .min(minLocal, `Minimum hourly rate must be at least ${currencySymbol}${minLocal.toFixed(2)}`),
      max: z
        .number()
        .min(minLocal, `Maximum hourly rate must be at least ${currencySymbol}${minLocal.toFixed(2)}`),
      hoursPerWeek: z
        .number()
        .min(1, "Hours per week must be at least 1")
        .max(60, "Hours per week cannot exceed 60"),
      estimatedDuration: z.enum(["1 To 3 Months", "3 To 6 Months"]),
    })
    .refine((data) => data.max >= data.min, {
      message:
        "Maximum hourly rate must be greater than or equal to minimum rate",
      path: ["max"],
    })
    .refine((data) => data.min <= maxLocal && data.max <= maxLocal, {
      message: `Hourly rate cannot exceed ${currencySymbol}${maxLocal.toFixed(2)}`,
      path: ["max"],
    });
}

export function createFixedBudgetSchema(rateToUSD: number, currencySymbol: string = '$') {
  const toLocal = (usd: number) => (rateToUSD > 0 ? usd * rateToUSD : usd);
  const minLocal = toLocal(5);
  const maxLocal = toLocal(10000);
  return z
    .object({
      min: z
        .number()
        .min(minLocal, `Minimum budget must be at least ${currencySymbol}${minLocal.toFixed(2)}`),
      max: z
        .number()
        .min(minLocal, `Maximum budget must be at least ${currencySymbol}${minLocal.toFixed(2)}`),
    })
    .refine((data) => data.max >= data.min, {
      message: "Maximum budget must be greater than or equal to minimum budget",
      path: ["max"],
    })
    .refine((data) => data.min <= maxLocal && data.max <= maxLocal, {
      message: `Budget cannot exceed ${currencySymbol}${maxLocal.toFixed(2)}`,
      path: ["max"],
    });
}


export const JobDescriptionSchema = z
  .string()
  .min(50, "Description must be at least 50 characters long")
  .max(50000,"Description cannot exceed 50000 characters")
  .refine(
    (val) => val.replace(/<[^>]*>/g, "").trim().length >= 50,
    "Minimum 50 characters required"
  )
  .refine(
    (val) => !/ {2,}/.test(val.replace(/<[^>]*>/g, "")),
    "Description cannot contain excessive spaces"
  );
