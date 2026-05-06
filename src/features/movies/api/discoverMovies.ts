import { DiscoverMoviesParams } from "@/@types/discover-movies.types";

export async function discoverMovies({
  page = 1,
  region,
  language,
  genre,
  sortBy = "popularity.desc",
}: DiscoverMoviesParams) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page: String(page),
    sort_by: sortBy,
  });

  if (region) {
    params.append("region", region);
  }

  if (language) {
    params.append("with_original_language", language);
  }

  if (genre) {
    params.append("with_genres", genre);
  }

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/discover/movie?${params}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}
