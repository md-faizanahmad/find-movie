"use server";

import { createClient } from "@/lib/supabase/server";

import { isAdult, requestOtpSchema } from "../lib/validation";

import { setPendingUser } from "../lib/pending-user";
import { env } from "@/lib/config/env";

export interface RequestOtpState {
  success: boolean;
  error: string | null;
}

export async function requestOtpAction(
  _: RequestOtpState,
  formData: FormData,
): Promise<RequestOtpState> {
  const parsed = requestOtpSchema.safeParse({
    fullName: formData.get("fullName"),

    email: formData.get("email"),

    birthYear: formData.get("birthYear"),
  });

  if (!parsed.success) {
    return {
      success: false,

      error: parsed.error.issues[0]?.message ?? "Invalid form submission",
    };
  }

  const { fullName, email, birthYear } = parsed.data;

  if (!isAdult(birthYear)) {
    return {
      success: false,

      error: "You must be at least 18 years old to create an account.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,

    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  await setPendingUser({
    fullName,
    email,
    birthYear,
  });

  return {
    success: true,
    error: null,
  };
}
