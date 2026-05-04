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
