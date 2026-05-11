import { redirect } from "next/navigation";

import { getCurrentProfile } from "./get-profile";

export async function requireAdultUser() {
  const profile = await getCurrentProfile();

  if (!profile || !profile.adult_verified) {
    redirect("/");
  }

  return profile;
}
