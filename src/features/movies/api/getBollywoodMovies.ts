// src/features/movies/services/getBollywoodMovies.ts

import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";
import { emptyResponse } from "@/lib/utils/emptyResponse";

interface Params {
  page?: number;
}

export async function getBollywoodMovies(
  params: Params = {},
): Promise<PaginatedResponse<TMDBMovie>> {
  const { page = 1 } = params;

  try {
    const res = await apiClient.get<PaginatedResponse<TMDBMovie>>(
      "/discover/movie",
      {
        params: {
          api_key: env.TMDB_API_KEY,
          page,
          with_original_language: "hi",
          region: "IN",
          sort_by: "popularity.desc",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.warn("Bollywood fallback");
    return emptyResponse();
  }
}
