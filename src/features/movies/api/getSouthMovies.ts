import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { emptyResponse } from "@/lib/utils/emptyResponse";

interface Params {
  page?: number;
}

export async function getSouthMovies(
  params: Params = {},
): Promise<PaginatedResponse<TMDBMovie>> {
  const { page = 1 } = params;

  try {
    const res = await apiClient.get<PaginatedResponse<TMDBMovie>>(
      "/discover/movie",
      {
        params: {
          page,
          with_original_language: "ta|te|ml|kn",
          region: "IN",
          sort_by: "popularity.desc",
        },
        revalidate: 3600,
      },
    );

    return res.data;
  } catch (error) {
    console.warn("South Indian fallback");
    return emptyResponse();
  }
}
