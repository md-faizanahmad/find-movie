// // features/movies/mappers/mapMovieDetails.ts

// import {
//   MovieDetails,
//   TMDBMovieDetailsResponse,
// } from "@/@types/movie.details.types";

// export function mapMovieDetails(movie: TMDBMovieDetailsResponse): MovieDetails {
//   return {
//     id: movie.id,

//     title: movie.title ?? movie.name ?? "",

//     originalTitle: movie.original_title ?? movie.original_name ?? "",

//     overview: movie.overview,

//     tagline: movie.tagline ?? "",

//     posterPath: movie.poster_path,

//     backdropPath: movie.backdrop_path,

//     genres: movie.genres,

//     runtime: movie.runtime ?? movie.episode_run_time?.[0] ?? 0,

//     releaseDate: movie.release_date ?? movie.first_air_date ?? "",

//     rating: movie.vote_average,

//     voteCount: movie.vote_count,

//     status: movie.status ?? "",

//     homepage: movie.homepage ?? null,

//     cast: movie.credits.cast.map((cast) => ({
//       id: cast.id,
//       name: cast.name,
//       character: cast.character,
//       profilePath: cast.profile_path,
//     })),

//     videos: movie.videos.results,

//     backdrops: movie.images.backdrops.map((backdrop) => ({
//       filePath: backdrop.file_path,
//     })),
//   };
// }
