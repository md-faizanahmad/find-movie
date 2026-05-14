import { Media } from "@/features/home/services/home.service";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN!;

interface FavoriteItem {
  mediaId: number;
  mediaType: "movie" | "tv" | "person";
}

interface TMDBResponse {
  id: number;
  title?: string;

  name?: string;

  poster_path?: string | null;

  backdrop_path?: string | null;

  vote_average?: number;

  popularity?: number;

  overview?: string;

  release_date?: string;

  first_air_date?: string;
}

async function fetchFavoriteItem(
  favorite: FavoriteItem,
): Promise<Media | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${favorite.mediaType}/${favorite.mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },

        next: {
          revalidate: 60 * 60,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: TMDBResponse = await response.json();

    return {
      id: data.id,

      mediaType: favorite.mediaType === "person" ? "movie" : favorite.mediaType,

      title: data.title ?? data.name ?? "",

      poster: data.poster_path ?? null,

      backdrop: data.backdrop_path ?? null,

      rating: data.vote_average ?? 0,

      popularity: data.popularity ?? 0,

      releaseDate: data.release_date ?? data.first_air_date ?? "",

      overview: data.overview ?? "",
    };
  } catch (error) {
    console.error("Favorite fetch failed:", error);

    return null;
  }
}

export async function getFavoriteMedia(
  favorites: FavoriteItem[],
): Promise<Media[]> {
  const results = await Promise.all(favorites.map(fetchFavoriteItem));

  return results.filter((item): item is Media => item !== null);
}
