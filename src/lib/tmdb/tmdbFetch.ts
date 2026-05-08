const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface TMDBFetchOptions extends RequestInit {
  revalidate?: number;
}

export async function tmdbFetch<T>(
  endpoint: string,
  options: TMDBFetchOptions = {},
): Promise<T> {
  const { revalidate = 3600, ...fetchOptions } = options;

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    ...fetchOptions,

    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },

    next: {
      revalidate,
    },
  });
  console.log(`${TMDB_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
