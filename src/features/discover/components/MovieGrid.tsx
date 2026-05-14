// import { MediaCard } from "@/features/home/components/MediaCard";

// interface Props {
//   movies: any[];
// }

// export function MovieGrid({ movies }: Props) {
//   return (
//     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//       {movies.map((movie) => (
//         <MediaCard
//           key={movie.id}
//           item={{
//             id: movie.id,
//             mediaType: "movie",
//             title: movie.title,
//             poster: movie.poster_path,
//             backdrop: movie.backdrop_path,
//             rating: movie.vote_average,
//             popularity: movie.popularity,
//             releaseDate: movie.release_date,
//           }}
//         />
//       ))}
//     </div>
//   );
// }
// import { MediaCard } from "@/features/home/components/MediaCard";

// interface Props {
//   movies: any[];
// }

// export function MovieGrid({ movies }: Props) {
//   if (!movies?.length) return null;

//   return (
//     <section className="w-full py-6">
//       {/*
//          Responsive Logic:
//          - Mobile: 2 columns, tight gap (4)
//          - Tablet: 3-4 columns
//          - Desktop: 5 columns
//          - Wide: 6 columns
//          - Ultra-Wide: 8 columns (to maintain card aspect ratio)
//       */}
//       <div
//         className="grid grid-cols-2 gap-x-4 gap-y-8
//                       sm:grid-cols-3
//                       md:grid-cols-4 md:gap-x-6
//                       lg:grid-cols-5
//                       xl:grid-cols-5
//                       xl:gap-3
//                       2xl:grid-cols-8
//                       max-w-500 mx-auto"
//       >
//         {movies.map((movie) => (
//           <div key={movie.id} className="flex justify-center">
//             <MediaCard
//               item={{
//                 id: movie.id,
//                 mediaType: "movie",
//                 title: movie.title,
//                 poster: movie.poster_path,
//                 backdrop: movie.backdrop_path,
//                 rating: movie.vote_average,
//                 popularity: movie.popularity,
//                 releaseDate: movie.release_date,
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// update with aith
import { MediaCard } from "@/features/home/components/MediaCard";

import { Media } from "@/features/home/services/home.service";

interface Props {
  movies: any[];

  isAuthenticated?: boolean;
}

export function MovieGrid({ movies, isAuthenticated = false }: Props) {
  if (!movies?.length) {
    return null;
  }

  return (
    <section className="w-full py-6">
      <div
        className="
          mx-auto grid max-w-500
          grid-cols-2 gap-x-4 gap-y-8
          sm:grid-cols-3
          md:grid-cols-4 md:gap-x-6
          lg:grid-cols-5
          xl:grid-cols-5 xl:gap-3
          2xl:grid-cols-8
        "
      >
        {movies.map((movie) => {
          const media: Media = {
            id: movie.id,

            mediaType: "movie",

            title: movie.title ?? "",

            poster: movie.poster_path ?? null,

            backdrop: movie.backdrop_path ?? null,

            rating: movie.vote_average ?? 0,

            popularity: movie.popularity ?? 0,

            releaseDate: movie.release_date ?? "",

            overview: movie.overview ?? "",
          };

          return (
            <div key={movie.id} className="flex justify-center">
              <MediaCard item={media} isAuthenticated={isAuthenticated} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
