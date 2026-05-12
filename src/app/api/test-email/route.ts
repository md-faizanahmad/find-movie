import { sendOtpEmail } from "@/features/Auth/lib/send-otp-email";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sendOtpEmail({
      email: process.env.SMTP_EMAIL as string,
      otp: "123456",
    });

    return NextResponse.json({
      success: true,
      message: "OTP email sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      {
        status: 500,
      },
    );
  }
}
