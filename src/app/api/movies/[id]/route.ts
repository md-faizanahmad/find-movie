import { NextResponse } from "next/server";
import { getMovieDetails } from "@/features/movies/api/getMovieDetails";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  if (!/^\d+$/.test(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}
