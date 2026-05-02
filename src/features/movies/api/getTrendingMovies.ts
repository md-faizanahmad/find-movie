import { Movie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";

export async function getTrendingMovies(): Promise<PaginatedResponse<Movie>> {
  const response = await apiClient.get<PaginatedResponse<Movie>>(
    "/trending/movie/day",
  );

  return response.data;
}
