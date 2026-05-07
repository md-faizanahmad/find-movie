export interface SearchMoviesParams {
  query: string;

  page?: number;
}

export async function searchMovies(query: string, page = 1) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    query,
    page: String(page),
  });

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/search/movie?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  return res.json();
}
