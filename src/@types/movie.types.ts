// export interface Movie {
//   id: number;
//   title: string;
//   original_title: string;
//   overview: string;
//   poster_path: string | null;
//   backdrop_path: string | null;
//   release_date: string;
//   vote_average: number;
//   vote_count: number;
//   popularity: number;
//   adult: boolean;
//   genre_ids: number[];
//   original_language: string;
// }
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;

  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;

  vote_average: number;
  vote_count: number;

  popularity: number;

  genre_ids: number[];

  adult: boolean;
  video: boolean;

  original_language: string;
}
