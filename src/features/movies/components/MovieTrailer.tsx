"use client";

import type { Video } from "@/@types/movie.details.types";

interface Props {
  videos: Video[];
}

export function MovieTrailer({ videos }: Props) {
  // Find the official trailer specifically, or fallback to any YouTube video
  const trailer =
    videos?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos?.find((v) => v.site === "YouTube");

  if (!trailer) return null;

  return (
    <section className="px-8 mt-12 mb-16">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Official Trailer
      </h2>

      <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
            title={`${trailer} Trailer`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
