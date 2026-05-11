import { z } from "zod";

import { MINIMUM_ADULT_AGE } from "./constants";

const currentYear = new Date().getFullYear();

export const requestOtpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is too short")
    .max(100, "Full name is too long"),

  email: z.email("Invalid email address"),

  birthYear: z.coerce
    .number()
    .int()
    .min(1900, "Invalid birth year")
    .max(currentYear),
});

export function isAdult(birthYear: number) {
  return currentYear - birthYear >= MINIMUM_ADULT_AGE;
}
