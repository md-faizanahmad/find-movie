import { NextRequest, NextResponse } from "next/server";
import { getTrendingMovies } from "@/features/movies/api/getTrendingMovies";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? "1");

    const data = await getTrendingMovies({ page });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("API ROUTE ERROR:", error);

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
