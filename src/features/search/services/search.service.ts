import { tmdbFetch } from "@/lib/tmdb/tmdbFetch";

export interface SearchResult {
  id: number;

  media_type: "movie" | "tv" | "person";

  title: string;

  image: string | null;

  year?: string;
}

interface TMDBSearchResponse {
  results: {
    id: number;

    media_type: string;

    adult?: boolean;

    title?: string;

    name?: string;

    poster_path?: string;

    profile_path?: string;

    release_date?: string;

    first_air_date?: string;
  }[];
}

export async function searchMulti(query: string): Promise<SearchResult[]> {
  const data = await tmdbFetch<TMDBSearchResponse>(
    `/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    {
      cache: "no-store",
    },
  );

  return data.results
    .filter((item) => {
      return ["movie", "tv", "person"].includes(item.media_type) && !item.adult;
    })
    .map((item) => ({
      id: item.id,

      media_type: item.media_type as "movie" | "tv" | "person",

      title: item.title || item.name || "Unknown",

      image: item.poster_path || item.profile_path || null,

      year:
        item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
    }));
}
