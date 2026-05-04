// features/movies/api/getMovieDetails.ts

import {
  MovieDetails,
  TMDBMovieDetailsResponse,
} from "@/@types/movie.details.types";

/**
 * Fetches movie details from TMDB and transforms
 * raw API response into a clean UI-friendly model.
 */
export async function getMovieDetails(
  id: string,
): Promise<MovieDetails | null> {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos,images`,

      {
        // next: { revalidate: 3600 }, // ✅ cache for 1 hour (SSR optimization)
        cache: "no-store",
      },
    );

    // ❌ If TMDB responds with error (404, 401, etc.)

    if (!res.ok) {
      const error = await res.text();
      console.error("TMDB ERROR:", res.status, error);
      return null;
    }
    // ✅ Strictly typed response
    const data: TMDBMovieDetailsResponse = await res.json();

    // ✅ Transform API → UI model (IMPORTANT: keeps UI clean)
    const movie: MovieDetails = {
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

    return movie;
  } catch (error) {
    console.error("Movie fetch failed:", error);
    return null;
  }
}
