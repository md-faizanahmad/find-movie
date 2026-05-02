import { apiClient } from "@/lib/api/client";

export async function getTrendingMovies() {
  const response = await apiClient.get("/trending/movie/day");
  return response.data;
}
