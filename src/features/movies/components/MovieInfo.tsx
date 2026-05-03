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
    <div className="flex gap-8 p-8">
      {poster_path && (
        <img
          src={`${POSTER_BASE}${poster_path}`}
          className="w-64 rounded-xl shadow-lg"
        />
      )}

      <div className="space-y-4">
        <p className="text-gray-400 leading-relaxed">{overview}</p>

        <div className="flex gap-2 flex-wrap">
          {genres.map((g) => (
            <span
              key={g.id}
              className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
