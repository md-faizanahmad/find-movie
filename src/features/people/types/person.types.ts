// src/features/people/types/person.types.ts

export interface TMDBKnownFor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  name?: string;
  original_language: string;

  original_title?: string;

  original_name?: string;

  overview: string;

  poster_path: string | null;

  media_type: "movie" | "tv";

  genre_ids: number[];

  popularity: number;

  release_date?: string;

  first_air_date?: string;

  video?: boolean;

  vote_average: number;

  vote_count: number;
}

export interface TMDBPerson {
  adult: boolean;

  gender: number;

  id: number;

  known_for_department: string;

  name: string;

  original_name: string;

  popularity: number;

  profile_path: string | null;

  known_for: TMDBKnownFor[];
}

export interface TMDBPeopleResponse {
  page: number;

  results: TMDBPerson[];

  total_pages: number;

  total_results: number;
}
