import { MovieCategory } from "@/@types/movie-category.types";
import { Movie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";
import { env } from "@/lib/config/env";

interface GetMoviesParams {
  category: MovieCategory;
  page?: number;
}

function resolveEndpoint(category: MovieCategory) {
  switch (category) {
    case "trending":
      return "/trending/movie/day";
    case "top_rated":
      return "/movie/top_rated";
    case "upcoming":
      return "/movie/upcoming";
    case "latest":
      return "/movie/latest"; // ⚠️ not paginated
    default:
      return "/trending/movie/day";
  }
}

export async function getMovies({
  category,
  page = 1,
}: GetMoviesParams): Promise<PaginatedResponse<Movie> | Movie> {
  const endpoint = resolveEndpoint(category);

  const response = await apiClient.get(endpoint, {
    params: {
      api_key: env.TMDB_API_KEY,
      ...(category !== "latest" && { page }),
    },
  });

  return response.data;
}
