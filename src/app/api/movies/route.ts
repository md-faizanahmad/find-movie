import { NextRequest, NextResponse } from "next/server";
import { getMovies } from "@/features/movies/api/getMovies";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = (searchParams.get("category") ?? "trending") as any;

    const page = Number(searchParams.get("page") ?? "1");

    const data = await getMovies({ category, page });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
