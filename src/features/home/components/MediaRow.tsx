import { TMDBMovie } from "@/@types/movie.types";
import { MovieCard } from "@/features/movies/components/movie-card";

interface Props {
  title: string;
  items: TMDBMovie[];
}

export function MediaRow({ title, items }: Props) {
  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

      <div className="flex gap-4 overflow-x-scroll">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}
