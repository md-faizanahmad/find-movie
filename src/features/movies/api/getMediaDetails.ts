import {
  MovieDetails,
  TMDBMovieDetailsResponse,
} from "@/@types/movie.details.types";

export async function getMediaDetails(
  id: string,
  mediaType: "movie" | "tv",
): Promise<MovieDetails | null> {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos,images`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const data: TMDBMovieDetailsResponse = await res.json();

    return {
      title: data.title || data.name || "",

      backdrop_path: data.backdrop_path ?? "",
      tagline: data.tagline ?? "",

      poster_path: data.poster_path ?? "",

      overview: data.overview,

      genres: data.genres,

      runtime: data.runtime || data.episode_run_time?.[0] || 0,

      release_date: data.release_date || data.first_air_date || "",

      vote_average: data.vote_average,

      credits: data.credits,
      videos: data.videos,
      images: data.images,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
}
