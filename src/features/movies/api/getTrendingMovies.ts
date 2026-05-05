import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";

interface GetTrendingMoviesParams {
  page?: number;
}

export async function getTrendingMovies(
  params: GetTrendingMoviesParams = {},
): Promise<PaginatedResponse<TMDBMovie>> {
  const { page = 1 } = params;

  try {
    const response = await apiClient.get<PaginatedResponse<TMDBMovie>>(
      "/trending/movie/day",
      {
        params: {
          api_key: env.TMDB_API_KEY,
          page,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.warn("Using mock data due to API failure");

    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    };
  }
}
