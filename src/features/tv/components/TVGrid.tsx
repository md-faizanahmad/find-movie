import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  shows: any[];
  isAuthenticated?: boolean;
}

export function TVGrid({ shows, isAuthenticated = false }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xl:gap-3">
      {shows.map((show) => (
        <MediaCard
          key={show.id}
          item={{
            id: show.id,
            mediaType: "tv",
            title: show.name,
            poster: show.poster_path,
            backdrop: show.backdrop_path,
            rating: show.vote_average,
            popularity: show.popularity,
            releaseDate: show.first_air_date,
          }}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
}
