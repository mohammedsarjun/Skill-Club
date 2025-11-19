// ✅ Validation using Zod

import { z } from "zod";

function stringToNumber(val: unknown, fieldName: string) {
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) {

      return undefined; 
    }
    return parsed;
  }
  return val;
}

export function proposalSchema(jobType: string, rateToUSD: number = 1) {
  const toLocal = (usd: number) => (rateToUSD > 0 ? usd / rateToUSD : usd);
  if (jobType === "hourly") {
    const minLocal = toLocal(5);
    const maxLocal = toLocal(999);
    return z.object({
      hourlyRate: z.preprocess(
        (val) => stringToNumber(val, "hourlyRate"),
        z
          .number()
          .min(minLocal, `Hourly rate must be at least $5 (≈ ${minLocal.toFixed(2)})`)
          .max(maxLocal, `Hourly rate cannot exceed $999 (≈ ${maxLocal.toFixed(2)})`)
      ),
      availableHoursPerWeek: z.preprocess(
        (val) => stringToNumber(val, "availableHoursPerWeek"),
        z.number().min(1, "Available hours are required")
      ),
      coverLetter: z.string().min(10, "Minimum 10 characters required"),
    });
  }
  const minLocal = toLocal(5);
  const maxLocal = toLocal(100000);
  return z.object({
    proposedBudget: z.preprocess(
      (val) => stringToNumber(val, "proposedBudget"),
      z
        .number()
        .min(minLocal, `Proposed budget must be at least $5 (≈ ${minLocal.toFixed(2)})`)
        .max(maxLocal, `Proposed budget cannot exceed $100000 (≈ ${maxLocal.toFixed(2)})`)
    ),
    deadline: z.string().nonempty("Deadline is required"),
    coverLetter: z.string().min(10, "Minimum 10 characters required"),
  });
}
