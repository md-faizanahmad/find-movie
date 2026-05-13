import { getCurrentUser } from "@/features/Auth/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    return NextResponse.json({
      authenticated: !!user,

      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 500,
      },
    );
  }
}
