export type AuthStep = "login" | "verify" | "success";

export interface RequestOtpPayload {
  fullName: string;
  email: string;
  birthYear: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}
