import { MovieCategory } from "@/@types/movie-category.types";
import { Movie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";

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

  try {
    const response = await apiClient.get(endpoint, {
      params: category !== "latest" ? { page } : undefined,
    });

    const data = response.data;

    if (category === "latest") {
      return {
        page: 1,
        results: data ? [data] : [],
        total_pages: 1,
        total_results: data ? 1 : 0,
      };
    }

    return data;
  } catch (error) {
    console.error(`TMDb failed for ${category}`, error);

    // ✅ fallback for SSR — but DON'T hide error completely
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    };
  }
}
