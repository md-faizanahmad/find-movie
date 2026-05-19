const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN = process.env.TMDB_API_TOKEN;

export async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },

    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    console.error(await response.text());

    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}
