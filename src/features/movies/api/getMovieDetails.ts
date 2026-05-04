// features/movies/api/getMovieDetails.ts

import { MovieDetails } from "@/@types/movie.details.types";

type TMDBGenre = {
  id: number;
  name: string;
};

type TMDBMovieDetailsResponse = {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
  poster_path: string | null;
  overview: string;
  genres: TMDBGenre[];
  runtime: number;
  release_date: string;
  vote_average: number;
};

export async function getMovieDetails(
  id: string,
): Promise<MovieDetails | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits,videos,images`,
      {
        next: { revalidate: 3600 }, // ✅ caching
      },
    );

    if (!res.ok) {
      return null;
    }

    const data: TMDBMovieDetailsResponse = await res.json();

    // ✅ transform here (NOT in page)
    return {
      title: data.title,
      backdrop_path: data.backdrop_path ?? "",
      tagline: data.tagline ?? "",
      poster_path: data.poster_path ?? "",
      overview: data.overview,
      genres: data.genres,
      runtime: data.runtime,
      release_date: data.release_date,
      vote_average: data.vote_average,
    };
  } catch (error) {
    console.error("Movie fetch failed:", error);
    return null;
  }
}
