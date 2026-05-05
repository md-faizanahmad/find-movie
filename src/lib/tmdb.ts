// lib/tmdb.ts

export async function fetchFromAPI(endpoint: string) {
  const res = await fetch(`/api/tmdb${endpoint}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("API fetch failed");
  }

  return res.json();
}
