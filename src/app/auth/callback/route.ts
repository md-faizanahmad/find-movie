import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

import {
  clearPendingUser,
  getPendingUser,
} from "@/features/Auth/lib/pending-user";
import { createProfile } from "@/features/Auth/lib/profile";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pendingUser = await getPendingUser();

  if (!pendingUser) {
    await supabase.auth.signOut();

    return NextResponse.redirect(new URL("/", request.url));
  }

  await createProfile(supabase, {
    userId: data.user.id,
    email: pendingUser.email,
    fullName: pendingUser.fullName,
    birthYear: pendingUser.birthYear,
  });

  await clearPendingUser();

  return NextResponse.redirect(new URL("/", request.url));
}
