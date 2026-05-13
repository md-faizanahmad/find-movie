import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env/server";

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
}

export async function generateSessionToken(
  payload: SessionPayload,
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, secretKey);

    return verified.payload as SessionPayload;
  } catch {
    return null;
  }
}
