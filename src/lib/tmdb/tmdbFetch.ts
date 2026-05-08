const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface TMDBFetchOptions extends RequestInit {
  revalidate?: number;
}

export async function tmdbFetch<T>(
  endpoint: string,
  options: TMDBFetchOptions = {},
): Promise<T> {
  const { revalidate = 3600, ...fetchOptions } = options;

  console.log("TOKEN EXISTS:", !!process.env.TMDB_API_TOKEN);
  console.log("FETCHING:", `${TMDB_BASE_URL}${endpoint}`);

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

  if (!response.ok) {
    const error = await response.text();

    console.error("TMDB ERROR:", error);

    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
