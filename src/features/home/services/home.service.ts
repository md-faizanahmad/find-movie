////////////////////// update with single lanagug
import { TMDBMovie } from "@/@types/movie.types";
import { TMDBTV } from "@/@types/tv.types";

import { getTrendingMovies } from "@/features/movies/api/getTrendingMovies";
import { getBollywoodMovies } from "@/features/movies/api/getBollywoodMovies";
import { getSouthMovies } from "@/features/movies/api/getSouthMovies";
import { getIndianTVShows } from "@/features/movies/api/getIndianTVShows";
import { getHollywoodTVShows } from "@/features/movies/api/getHollywoodTVShows";

/* -------------------------------------------------------------------------- */
/*                                NORMALIZED TYPE                             */
/* -------------------------------------------------------------------------- */

export interface Media {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  popularity: number;
  adult?: boolean;
  releaseDate: string;
  overview?: string;
  isFavorited?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              SAFE MAPPERS                                  */
/* -------------------------------------------------------------------------- */

function mapMovie(movie: TMDBMovie): Media {
  return {
    id: movie.id,
    mediaType: "movie",
    title: movie.title ?? "",
    poster: movie.poster_path ?? null,
    backdrop: movie.backdrop_path ?? null,
    rating: movie.vote_average ?? 0,
    popularity: movie.popularity ?? 0,
    releaseDate: movie.release_date ?? "",
    // adult: isAdultContent(movie),
    overview: movie.overview ?? "",
  };
}

function mapTV(tv: TMDBTV): Media {
  return {
    id: tv.id,
    mediaType: "tv",
    title: tv.name ?? "",
    poster: tv.poster_path ?? null,
    backdrop: tv.backdrop_path ?? null,
    rating: tv.vote_average ?? 0,
    popularity: tv.popularity ?? 0,
    // adult: isAdultContent(tv),
    releaseDate: tv.first_air_date ?? "",
    overview: tv.overview ?? "",
  };
}

/* -------------------------------------------------------------------------- */
/*                             MAIN HOME SERVICE                              */
/* -------------------------------------------------------------------------- */

export async function getHomeData() {
  try {
    const [trendingRes, bollywoodRes, southRes, tvRes, hollywoodTVRes] =
      await Promise.all([
        getTrendingMovies(),
        getBollywoodMovies(),
        getSouthMovies(),
        getIndianTVShows(),
        getHollywoodTVShows(),
      ]);

    /* ---------------------------- Normalize Movies --------------------------- */

    const trending = (trendingRes.results ?? []).map(mapMovie);
    const bollywood = (bollywoodRes.results ?? []).map(mapMovie);
    const southIndian = (southRes.results ?? []).map(mapMovie);
    const hollywoodTV = (hollywoodTVRes.results ?? []).map(mapTV);

    /* ---------------------------- Indian TV Shows ---------------------------- */

    const indianTV = (tvRes.results ?? []).map(mapTV);

    /* ----------------------------- Final Output ------------------------------ */

    return {
      trending,
      bollywood,
      southIndian,
      indianTV,
      hollywoodTV,
    };
  } catch (error) {
    console.error("getHomeData failed:", error);

    // hard fallback (never break homepage)
    return {
      trending: [],
      bollywood: [],
      southIndian: [],
      indianTV: [],
      hollywoodTV: [],
    };
  }
}
