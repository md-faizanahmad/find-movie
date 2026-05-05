// src/features/home/services/getHomeData.ts

import { getTrendingMovies } from "@/features/movies/api/getTrendingMovies";
import { getBollywoodMovies } from "@/features/movies/api/getBollywoodMovies";
import { getSouthMovies } from "@/features/movies/api/getSouthMovies";
import { getIndianTVShows } from "@/features/movies/api/getIndianTVShows";

import { TMDBMovie } from "@/@types/movie.types";
import { TMDBTV } from "@/@types/tv.types";
import { mergeAndSort } from "@/lib/utils/mergeAndSort";

/* -------------------------------------------------------------------------- */
/*                                NORMALIZED TYPE                             */
/* -------------------------------------------------------------------------- */

export interface Media {
  id: number;
  title: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  popularity: number;
  releaseDate: string;
}

/* -------------------------------------------------------------------------- */
/*                              SAFE MAPPERS                                  */
/* -------------------------------------------------------------------------- */

function mapMovie(movie: TMDBMovie): Media {
  return {
    id: movie.id,
    title: movie.title ?? "",
    poster: movie.poster_path ?? null,
    backdrop: movie.backdrop_path ?? null,
    rating: movie.vote_average ?? 0,
    popularity: movie.popularity ?? 0,
    releaseDate: movie.release_date ?? "",
  };
}

function mapTV(tv: TMDBTV): Media {
  return {
    id: tv.id,
    title: tv.name ?? "",
    poster: tv.poster_path ?? null,
    backdrop: tv.backdrop_path ?? null,
    rating: tv.vote_average ?? 0,
    popularity: tv.popularity ?? 0,
    releaseDate: tv.first_air_date ?? "",
  };
}

/* -------------------------------------------------------------------------- */
/*                             MAIN HOME SERVICE                              */
/* -------------------------------------------------------------------------- */

export async function getHomeData() {
  try {
    const [
      trendingRes,
      bollywoodRes,
      tamilRes,
      teluguRes,
      malayalamRes,
      kannadaRes,
      tvRes,
    ] = await Promise.all([
      getTrendingMovies(),
      getBollywoodMovies(),
      getSouthMovies({ language: "ta" }),
      getSouthMovies({ language: "te" }),
      getSouthMovies({ language: "ml" }),
      getSouthMovies({ language: "kn" }),
      getIndianTVShows(),
    ]);

    /* ---------------------------- Normalize Movies --------------------------- */

    const trending = (trendingRes.results ?? []).map(mapMovie);
    const bollywood = (bollywoodRes.results ?? []).map(mapMovie);

    /* ---------------------------- South Merge Logic -------------------------- */

    const southRaw: TMDBMovie[] = [
      ...(tamilRes.results ?? []),
      ...(teluguRes.results ?? []),
      ...(malayalamRes.results ?? []),
      ...(kannadaRes.results ?? []),
    ];

    const southIndian = mergeAndSort(southRaw.map(mapMovie));

    /* ---------------------------- Indian TV Shows ---------------------------- */

    const indianTV = (tvRes.results ?? []).map(mapTV);

    /* ----------------------------- Final Output ------------------------------ */

    return {
      trending,
      bollywood,
      southIndian,
      indianTV,
    };
  } catch (error) {
    console.error("getHomeData failed:", error);

    // fallback (prevents homepage crash)
    return {
      trending: [],
      bollywood: [],
      southIndian: [],
      indianTV: [],
    };
  }
}
