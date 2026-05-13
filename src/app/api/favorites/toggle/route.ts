import { requireAuth } from "@/features/Auth/lib/auth";
import { UserModel } from "@/features/Auth/models/user.model";
import { toggleFavoriteSchema } from "@/features/Auth/validations/auth.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();

    const parsedBody = toggleFavoriteSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid favorite payload",
        },
        {
          status: 400,
        },
      );
    }

    const { mediaId } = parsedBody.data;

    const existingUser = await UserModel.findById(user.id);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const alreadyFavorited = existingUser.favorites.includes(mediaId);

    if (alreadyFavorited) {
      existingUser.favorites = existingUser.favorites.filter(
        (id) => id !== mediaId,
      );
    } else {
      existingUser.favorites.push(mediaId);
    }

    await existingUser.save();

    return NextResponse.json({
      success: true,

      favorited: !alreadyFavorited,

      favorites: existingUser.favorites,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update favorites",
      },
      {
        status: 500,
      },
    );
  }
}
