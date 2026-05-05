// src/features/movies/services/getSouthMovies.ts

import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";
import { emptyResponse } from "@/lib/utils/emptyResponse";

type SouthLanguage = "ta" | "te" | "ml" | "kn";

interface Params {
  page?: number;
  language: SouthLanguage;
}

export async function getSouthMovies(
  params: Params,
): Promise<PaginatedResponse<TMDBMovie>> {
  const { page = 1, language } = params;

  try {
    const res = await apiClient.get<PaginatedResponse<TMDBMovie>>(
      "/discover/movie",
      {
        params: {
          api_key: env.TMDB_API_KEY,
          page,
          with_original_language: language,
          region: "IN",
          sort_by: "popularity.desc",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.warn(`South (${language}) fallback`);
    return emptyResponse();
  }
}
