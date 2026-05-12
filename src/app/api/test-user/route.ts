import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongoose";
import { UserModel } from "@/features/Auth/models/user.model";

export async function GET() {
  try {
    await connectToDatabase();

    const existingUser = await UserModel.findOne({
      email: "test@example.com",
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    const user = await UserModel.create({
      email: "test@example.com",
      fullName: "Test User",
      birthYear: 2000,
      adultVerified: true,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
