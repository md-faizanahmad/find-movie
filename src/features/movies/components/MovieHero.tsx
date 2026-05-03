import Image from "next/image";

interface Props {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
}

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export function MovieHero({ title, backdrop_path, tagline }: Props) {
  if (!backdrop_path) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Next.js Optimized Image */}
      <Image
        src={`${BACKDROP_BASE}${backdrop_path}`}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
        {tagline && (
          <p className="text-gray-300 mt-4 text-lg md:text-xl italic">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
