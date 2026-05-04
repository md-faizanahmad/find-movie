import { Genre } from "@/@types/movie.details.types";
import Image from "next/image";

interface Props {
  poster_path: string;
  overview: string;
  genres: string[];
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export function MovieInfo({ poster_path, overview, genres }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {poster_path && (
        <div className="relative w-64 shrink-0">
          <Image
            src={`${POSTER_BASE}${poster_path}`}
            alt="Movie Poster"
            width={256}
            height={384}
            className="rounded-xl shadow-lg object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{overview}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {genres.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
