interface Props {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
}

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export function MovieHero({ title, backdrop_path, tagline }: Props) {
  if (!backdrop_path) return null;

  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={`${BACKDROP_BASE}${backdrop_path}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 p-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        {tagline && <p className="text-gray-300 mt-2 italic">{tagline}</p>}
      </div>
    </div>
  );
}
