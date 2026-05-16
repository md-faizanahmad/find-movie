import { TMDBMovie } from "@/@types/movie.types";
import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  movies: TMDBMovie[];
  isAuthenticated?: boolean;
}

export function MovieGrid({ movies, isAuthenticated = false }: Props) {
  if (!movies?.length) return null;

  return (
    <section className="w-full py-6 px-4 md:px-8">
      {/* 
          Responsive Logic:
          - Mobile: 2 columns, gap-6 (24px)
          - Tablet: 3-4 columns, gap-8 (32px)
          - Desktop: 5 columns
          - Wide: 6 columns
          - Ultra-Wide: 8 columns
      */}
      <div
        className="grid grid-cols-2 gap-6
                   sm:grid-cols-3 
                   md:grid-cols-4 md:gap-8 
                   lg:grid-cols-5 
                   xl:grid-cols-6
                   2xl:grid-cols-8 
                   max-w-7xl mx-auto"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-full flex justify-center">
            <MediaCard
              item={{
                id: movie.id,
                mediaType: "movie",
                title: movie.title,
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
                rating: movie.vote_average,
                popularity: movie.popularity,
                releaseDate: movie.release_date,
              }}
              isAuthenticated={isAuthenticated}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
