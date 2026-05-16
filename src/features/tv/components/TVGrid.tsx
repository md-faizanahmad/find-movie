import { TMDBTV } from "@/@types/tv.types";
import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  shows: TMDBTV[];
  isAuthenticated?: boolean;
}

export function TVGrid({ shows, isAuthenticated = false }: Props) {
  return (
    <div
      className="grid grid-cols-2 gap-6 
                 sm:grid-cols-3 
                 md:grid-cols-4 md:gap-8 
                 lg:grid-cols-5 
                 xl:grid-cols-6"
    >
      {shows.map((show) => (
        <div key={show.id} className="w-full flex justify-center">
          <MediaCard
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
        </div>
      ))}
    </div>
  );
}
