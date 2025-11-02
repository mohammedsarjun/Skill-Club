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

export const HourlyBudgetSchema = z
  .object({
    min: z
      .number()
      .min(100, "Minimum hourly rate must be at least ₹100")
      .max(100000, "Minimum hourly rate cannot exceed ₹100,000"),
    max: z
      .number()
      .min(100, "Maximum hourly rate must be at least ₹100")
      .max(100000, "Maximum hourly rate cannot exceed ₹100,000"),
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
  });

export const FixedBudgetSchema = z
  .object({
    min: z
      .number()
      .min(100, "Minimum budget must be at least ₹100")
      .max(100000, "Minimum budget cannot exceed ₹100,000"),
    max: z
      .number()
      .min(100, "Maximum budget must be at least ₹100")
      .max(100000, "Maximum budget cannot exceed ₹100,000"),
  })
  .refine((data) => data.max >= data.min, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["max"],
  });

// ✅ Schema for validation (checks for minimum words and space patterns)
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
