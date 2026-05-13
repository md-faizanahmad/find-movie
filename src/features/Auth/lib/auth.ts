import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/db/mongoose";
import { verifySessionToken } from "@/lib/jwt/jwt";
import { UserModel } from "../models/user.model";
import { AUTH_COOKIE_NAME } from "../constants/cookie.constants";
import { SessionUser } from "../types/session-user.types";

export async function getCurrentUser(): Promise<SessionUser | null> {
  await connectToDatabase();

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  const payload = await verifySessionToken(sessionCookie.value);
  if (!payload) {
    return null;
  }

  const user = await UserModel.findById(payload.userId).lean();
  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    fullName: user.fullName,
    adultVerified: user.adultVerified,
    emailVerified: user.emailVerified,
    favorites: user.favorites,
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
