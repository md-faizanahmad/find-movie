import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  movies: any[];
}

export function MovieGrid({ movies }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MediaCard
          key={movie.id}
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
        />
      ))}
    </div>
  );
}
