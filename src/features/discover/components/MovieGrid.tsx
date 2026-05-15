import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  movies: any[];
  isAuthenticated?: boolean;
}

export function MovieGrid({ movies, isAuthenticated = false }: Props) {
  if (!movies?.length) return null;

  return (
    <section className="w-full py-6">
      {/* 
         Responsive Logic:
         - Mobile: 2 columns, tight gap (4)
         - Tablet: 3-4 columns
         - Desktop: 5 columns
         - Wide: 6 columns
         - Ultra-Wide: 8 columns (to maintain card aspect ratio)
      */}
      <div
        className="grid grid-cols-2 gap-x-6 gap-y-8 
                      sm:grid-cols-3 
                      md:grid-cols-4 md:gap-x-8 
                      lg:grid-cols-5 
                      xl:grid-cols-5
                      xl:gap-4
                      2xl:grid-cols-8 
                      max-w-500 mx-auto"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center">
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
