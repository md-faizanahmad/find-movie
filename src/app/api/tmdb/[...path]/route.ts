// app/api/tmdb/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params; // ✅ IMPORTANT

  const endpoint = path.join("/");

  const searchParams = req.nextUrl.searchParams.toString();

  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&${searchParams}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "TMDB fetch failed" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
