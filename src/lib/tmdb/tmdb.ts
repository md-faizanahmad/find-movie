const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: API_KEY!,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("TMDB Fetch Failed");
  }

  return response.json();
}
