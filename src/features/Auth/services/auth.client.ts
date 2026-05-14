import {
  AuthResponse,
  RequestOtpPayload,
  VerifyOtpPayload,
} from "../types/auth-modal.types";

async function parseResponse(response: Response): Promise<AuthResponse> {
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function requestOtp(
  payload: RequestOtpPayload,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/request-otp", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/verify-otp", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function logout(): Promise<AuthResponse> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  return parseResponse(response);
}

export async function toggleFavorite(mediaId: number, mediaType: string) {
  const response = await fetch("/api/favorites/toggle", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      mediaId,
      mediaType,
    }),
  });

  return response.json();
}
