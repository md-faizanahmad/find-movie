import { NextResponse } from "next/server";

import { requireAuth } from "@/features/Auth/lib/auth";

import { UserModel } from "@/features/Auth/models/user.model";

export async function POST() {
  try {
    const user = await requireAuth();

    await UserModel.findByIdAndUpdate(user.id, {
      $set: {
        favorites: [],
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to clear favorites",
      },
      {
        status: 500,
      },
    );
  }
}
