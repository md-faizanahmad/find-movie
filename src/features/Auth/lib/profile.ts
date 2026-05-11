import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

interface CreateProfileInput {
  userId: string;
  email: string;
  fullName: string;
  birthYear: number;
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export async function createProfile(
  supabase: SupabaseClient<Database>,
  input: CreateProfileInput,
) {
  const { userId, email, fullName, birthYear } = input;

  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    email,
    full_name: fullName,
    birth_year: birthYear,
    adult_verified: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}
