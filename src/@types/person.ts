export interface PersonCredit {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  softcore?: boolean;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: "movie" | "tv";
}

export interface PersonCombinedCredits {
  cast: PersonCredit[];
  crew?: PersonCredit[];
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;

  combined_credits: PersonCombinedCredits;
}
