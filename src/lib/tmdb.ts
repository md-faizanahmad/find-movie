// lib/tmdb.ts

const API_KEY = process.env.TMDB_API_KEY;

export async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("TMDB fetch failed");
  }

  return res.json();
}
