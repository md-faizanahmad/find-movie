import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongoose";

import { setAuthCookie } from "@/lib/cookies/auth-cookie";

import { generateSessionToken } from "@/lib/jwt/jwt";
import { verifyOtpSchema } from "@/features/Auth/validations/auth.validation";
import { OtpCodeModel } from "@/features/Auth/models/otp.model";
import { MAX_OTP_ATTEMPTS } from "@/features/Auth/constants/auth.constants";
import { verifyOtpHash } from "@/features/Auth/utils/otp";
import { UserModel } from "@/features/Auth/models/user.model";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const parsedBody = verifyOtpSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
        },
        {
          status: 400,
        },
      );
    }

    const { email, otp } = parsedBody.data;

    const existingOtp = await OtpCodeModel.findOne({
      email,
    });

    if (!existingOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found or expired",
        },
        {
          status: 404,
        },
      );
    }

    if (existingOtp.attempts >= MAX_OTP_ATTEMPTS) {
      await OtpCodeModel.deleteOne({
        _id: existingOtp._id,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Too many failed attempts",
        },
        {
          status: 429,
        },
      );
    }

    const otpValid = verifyOtpHash(otp, existingOtp.otpHash);

    if (!otpValid) {
      existingOtp.attempts += 1;

      await existingOtp.save();

      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 401,
        },
      );
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User data missing. Please request OTP again.",
        },
        {
          status: 404,
        },
      );
    }

    const token = await generateSessionToken({
      userId: user._id.toString(),
      email: user.email,
    });

    await setAuthCookie(token);

    await OtpCodeModel.deleteOne({
      _id: existingOtp._id,
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP",
      },
      {
        status: 500,
      },
    );
  }
}
