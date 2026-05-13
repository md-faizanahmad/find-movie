import { NextRequest, NextResponse } from "next/server";
import { differenceInSeconds } from "date-fns";

import { connectToDatabase } from "@/lib/db/mongoose";
import { requestOtpSchema } from "@/features/Auth/validations/auth.validation";
import { isAdult } from "@/features/Auth/utils/age";
import { OtpCodeModel } from "@/features/Auth/models/otp.model";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/features/Auth/constants/auth.constants";
import {
  generateOtp,
  getOtpExpiryDate,
  hashOtp,
} from "@/features/Auth/utils/otp";
import { sendOtpEmail } from "@/features/Auth/lib/send-otp-email";
import { UserModel } from "@/features/Auth/models/user.model";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const parsedBody = requestOtpSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { fullName, email, birthYear } = parsedBody.data;

    const adult = isAdult(birthYear);

    if (!adult) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be at least 18 years old",
        },
        {
          status: 403,
        },
      );
    }
    await UserModel.findOneAndUpdate(
      {
        email,
      },
      {
        email,
        fullName,
        birthYear,
        adultVerified: true,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    const existingOtp = await OtpCodeModel.findOne({
      email,
    });

    if (existingOtp) {
      const secondsSinceLastOtp = differenceInSeconds(
        new Date(),
        existingOtp.createdAt,
      );

      if (secondsSinceLastOtp < OTP_RESEND_COOLDOWN_SECONDS) {
        return NextResponse.json(
          {
            success: false,
            message: "Please wait before requesting another OTP",
          },
          {
            status: 429,
          },
        );
      }

      await OtpCodeModel.deleteOne({
        _id: existingOtp._id,
      });
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = getOtpExpiryDate();

    await OtpCodeModel.create({
      email,
      otpHash,

      expiresAt,

      attempts: 0,
    });

    await sendOtpEmail({
      email,
      otp,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to request OTP",
      },
      {
        status: 500,
      },
    );
  }
}
