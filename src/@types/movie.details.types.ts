// features/movies/types/movie.details.types.ts

// 🔹 Raw TMDB types (API response)
export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBMovieDetailsResponse = {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
  poster_path: string | null;
  overview: string;
  genres: TMDBGenre[];
  runtime: number;
  release_date: string;
  vote_average: number;
};

// 🔹 Clean UI/domain types
export type Genre = {
  id: number;
  name: string;
};

export type MovieDetails = {
  title: string;
  backdrop_path: string;
  tagline: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  runtime: number;
  release_date: string;
  vote_average: number;
};
