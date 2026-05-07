export interface TMDBSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";

  title?: string;
  name?: string;

  poster_path?: string;
  profile_path?: string;

  release_date?: string;
  first_air_date?: string;

  overview?: string;
}
