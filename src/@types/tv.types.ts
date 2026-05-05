// src/@types/tv.types.ts

export interface TMDBTV {
  id: number;
  name: string;
  original_name: string;

  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  first_air_date: string;
  origin_country: string[];

  original_language: string;

  popularity: number;
  vote_average: number;
  vote_count: number;

  genre_ids: number[];

  adult: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
