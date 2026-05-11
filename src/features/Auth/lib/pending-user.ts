import { cookies } from "next/headers";

import { PENDING_USER_COOKIE } from "./constants";

export interface PendingUserData {
  fullName: string;
  email: string;
  birthYear: number;
}

export async function setPendingUser(data: PendingUserData) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: PENDING_USER_COOKIE,
    value: JSON.stringify(data),

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: 60 * 10,
  });
}

export async function getPendingUser() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(PENDING_USER_COOKIE);

  if (!cookie?.value) {
    return null;
  }

  try {
    return JSON.parse(cookie.value) as PendingUserData;
  } catch {
    return null;
  }
}

export async function clearPendingUser() {
  const cookieStore = await cookies();

  cookieStore.delete(PENDING_USER_COOKIE);
}
