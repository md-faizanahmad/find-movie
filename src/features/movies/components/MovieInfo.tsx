import Image from "next/image";

interface Props {
  poster_path: string | null;
  overview: string;
  genres: string[];
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export function MovieInfo({ poster_path, overview, genres }: Props) {
  return (
    <section className="flex flex-col md:flex-row gap-10 p-8">
      {/* Poster Container */}
      {poster_path && (
        <div className="mx-auto md:mx-0 w-64 shrink-0 transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src={`${POSTER_BASE}${poster_path}`}
            alt="Movie Poster"
            width={256}
            height={384}
            className="rounded-2xl shadow-2xl object-cover border border-white/10"
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>
      )}

      {/* Details Container */}
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Overview
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg max-w-3xl">
            {overview || "No overview available."}
          </p>
        </div>

        {/* Genre Badges */}
        <div className="flex gap-2 flex-wrap">
          {genres.map((name) => (
            <span
              key={name}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 
                         text-gray-300 text-sm font-medium hover:bg-white/10 
                         transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
