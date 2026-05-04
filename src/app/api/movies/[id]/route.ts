import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/features/movies/api/getMovieDetails";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ✅ critical fix

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const movie = await getMovieDetails(id);

  if (!movie) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}
