export async function searchTVShows(query: string, page = 1) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    query,
    page: String(page),
  });

  const res = await fetch(`${process.env.TMDB_BASE_URL}/search/tv?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to search TV shows");
  }

  return res.json();
}
