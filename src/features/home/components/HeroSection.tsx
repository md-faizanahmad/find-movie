// features/home/components/HeroSection.tsx

import { TMDBMovie } from "@/@types/movie.types";
import { SearchBar } from "./SearchBar";

export function HeroSection({ movie }: { movie: TMDBMovie }) {
  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="relative h-[80vh] w-full">
      <img
        src={backdrop}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white mb-4">
          Find Your Next Movie
        </h1>

        <SearchBar />
      </div>
    </div>
  );
}
