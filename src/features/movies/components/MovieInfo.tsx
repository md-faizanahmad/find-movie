import Image from "next/image";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  poster_path: string | null;
  overview: string;
  genres: Genre[];
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export function MovieInfo({ poster_path, overview, genres }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {poster_path && (
        <div className="relative w-64 flex-shrink-0">
          <Image
            src={`${POSTER_BASE}${poster_path}`}
            alt="Movie Poster"
            width={256} // Matching w-64 (64 * 4px)
            height={384} // Maintaining 2:3 aspect ratio
            className="rounded-xl shadow-lg object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Optional: simple grey pixel
          />
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{overview}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {genres.map((g) => (
            <span
              key={g.id}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-full text-sm border border-gray-700"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
