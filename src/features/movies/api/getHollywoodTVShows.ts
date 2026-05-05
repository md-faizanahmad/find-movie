// src/features/movies/api/getHollywoodTVShows.ts

import { TMDBTV, PaginatedResponse } from "@/@types/tv.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";

interface Params {
  page?: number;
}

export async function getHollywoodTVShows(
  params: Params = {},
): Promise<PaginatedResponse<TMDBTV>> {
  const { page = 1 } = params;

  try {
    const res = await apiClient.get<PaginatedResponse<TMDBTV>>("/discover/tv", {
      params: {
        api_key: env.TMDB_API_KEY,
        page,
        with_origin_country: "US",
        sort_by: "popularity.desc",
      },
    });

    return res.data;
  } catch (error) {
    console.warn("Hollywood TV fallback");

    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    };
  }
}
