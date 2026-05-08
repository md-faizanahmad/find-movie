// // features/movies/types/movie.details.types.ts

// // 🔹 Raw TMDB types (API response)
// export type TMDBGenre = {
//   id: number;
//   name: string;
// };

// export type TMDBMovieDetailsResponse = {
//   title: string;
//   backdrop_path: string | null;
//   tagline: string | null;
//   poster_path: string | null;
//   overview: string;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   runtime: number;
//   release_date: string;
//   vote_average: number;
//   name?: string;

//   first_air_date?: string;

//   episode_run_time?: number[];

//   // 🔥 REQUIRED (because of append_to_response)

//   credits: {
//     cast: {
//       id: number;
//       name: string;
//       character: string;
//       profile_path: string | null;
//     }[];
//   };

//   videos: {
//     results: {
//       key: string;
//       type: string;
//       site: string;
//     }[];
//   };

//   images: {
//     backdrops: {
//       file_path: string;
//     }[];
//   };
// };
// // 🔹 Clean UI/domain types
// export type Genre = {
//   id: number;
//   name: string;
// };

// export type CastMember = {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string | null;
// };

// export type Video = {
//   key: string;
//   type: string;
//   site: string;
// };

// export type Backdrop = {
//   file_path: string;
// };

// export type MovieDetails = {
//   title: string;
//   backdrop_path: string;
//   tagline: string;
//   poster_path: string;
//   overview: string;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   runtime: number;
//   release_date: string;
//   vote_average: number;

//   // 🔥 new
//   credits: {
//     cast: CastMember[];
//   };

//   videos: {
//     results: Video[];
//   };

//   images: {
//     backdrops: Backdrop[];
//   };
// };

////////// Update with more-
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

  genres: {
    id: number;
    name: string;
  }[];

  runtime: number;

  release_date: string;

  vote_average: number;

  // 🔥 NEW
  status?: string;

  original_language?: string;

  popularity?: number;

  // TV fallback
  name?: string;

  first_air_date?: string;

  episode_run_time?: number[];

  // 🔥 REQUIRED (because of append_to_response)

  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };

  videos: {
    results: {
      key: string;
      type: string;
      site: string;
    }[];
  };

  images: {
    backdrops: {
      file_path: string;
    }[];
  };
};

// ======================================================
// 🔹 Clean UI/domain types
// ======================================================

export type Genre = {
  id: number;
  name: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type Video = {
  key: string;
  type: string;
  site: string;
};

export type Backdrop = {
  file_path: string;
};

export type MovieDetails = {
  title: string;

  backdrop_path: string;

  tagline: string;

  poster_path: string;

  overview: string;

  genres: {
    id: number;
    name: string;
  }[];

  runtime: number;

  release_date: string;

  vote_average: number;

  // 🔥 NEW
  status: string;

  original_language: string;

  popularity: number;

  // 🔥 Existing
  credits: {
    cast: CastMember[];
  };

  videos: {
    results: Video[];
  };

  images: {
    backdrops: Backdrop[];
  };
};
