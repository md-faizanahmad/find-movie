// app/api/tmdb/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const path = params.path.join("/");

  const url = `${BASE_URL}/${path}?api_key=${API_KEY}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 6000 }, // caching
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "TMDB fetch failed" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
