import { MovieCategory } from "@/@types/movie-category.types";
import { Movie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";

interface GetMoviesParams {
  category: MovieCategory;
  page?: number;
}

function resolveEndpoint(category: MovieCategory): string {
  switch (category) {
    case "trending":
      return "/trending/movie/day";
    case "top_rated":
      return "/movie/top_rated";
    case "upcoming":
      return "/movie/upcoming";
    case "latest":
      return "/movie/latest";
    default:
      return "/trending/movie/day";
  }
}

export async function getMovies({
  category,
  page = 1,
}: GetMoviesParams): Promise<PaginatedResponse<Movie>> {
  const endpoint = resolveEndpoint(category);

  const response = await apiClient.get(endpoint, {
    params: {
      api_key: env.TMDB_API_KEY,
      ...(category !== "latest" && { page }),
    },
  });

  const data = response.data;

  // 🔥 Normalize "latest" to match PaginatedResponse
  if (category === "latest") {
    return {
      page: 1,
      results: data ? [data] : [],
      total_pages: 1,
      total_results: data ? 1 : 0,
    };
  }

  return data;
}
