import {
  generateOtp,
  getOtpExpiryDate,
  hashOtp,
} from "@/features/Auth/utils/otp";
import { NextResponse } from "next/server";

export async function GET() {
  const otp = generateOtp();

  const hashedOtp = hashOtp(otp);

  const expiresAt = getOtpExpiryDate();

  return NextResponse.json({
    otp,
    hashedOtp,
    expiresAt,
  });
}
