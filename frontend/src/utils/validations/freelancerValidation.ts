// ✅ Validation using Zod

import { z } from "zod";

function stringToNumber(val: unknown, fieldName: string) {
  if (typeof val === "string") {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {

      return undefined; 
    }
    return parsed;
  }
  return val;
}

export function proposalSchema(jobType: string) {
  return jobType === "hourly"
    ? z.object({
        hourlyRate: z.preprocess(
          (val) => stringToNumber(val, "hourlyRate"),
          z
            .number()
            .min(5, "Hourly rate must be at least $5")
            .max(999, "Hourly rate cannot exceed $999")
        ),
        availableHoursPerWeek: z.preprocess(
          (val) => stringToNumber(val, "availableHoursPerWeek"),
          z.number().min(1, "Available hours are required")
        ),
        coverLetter: z.string().min(10, "Minimum 10 characters required"),
      })
    : z.object({
        proposedBudget: z.preprocess(
          (val) => stringToNumber(val, "proposedBudget"),
          z.number().min(1, "Proposed budget is required")
        ),
        deadline: z.string().nonempty("Deadline is required"),
        coverLetter: z.string().min(10, "Minimum 10 characters required"),
      });
}
