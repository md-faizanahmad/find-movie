interface DiscoverTVShowsParams {
  page?: number;

  language?: string;

  sortBy?: string;
}

export async function discoverTVShows({
  page = 1,
  language,
  sortBy = "popularity.desc",
}: DiscoverTVShowsParams) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page: String(page),
    sort_by: sortBy,
  });

  if (language) {
    params.append("with_original_language", language);
  }

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/discover/tv?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to discover TV shows");
  }

  return res.json();
}
