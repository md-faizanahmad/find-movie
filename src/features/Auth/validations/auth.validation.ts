import { z } from "zod";

export const requestOtpSchema = z.object({
  fullName: z.string().trim().min(2).max(50),

  email: z.string().trim().toLowerCase().email(),

  birthYear: z.number().int().min(1900).max(new Date().getFullYear()),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email(),

  otp: z.string().trim().length(6),
});
export const toggleFavoriteSchema = z.object({
  mediaId: z.number().int().positive(),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
