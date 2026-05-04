"use client";

import type { Video } from "@/@types/movie.details.types";

interface Props {
  videos: Video[];
}

export function MovieTrailer({ videos }: Props) {
  // Priority: 1. Official Trailer, 2. Any Trailer, 3. Any YouTube video
  const trailer =
    videos?.find((v) => v.key === "Official Trailer" && v.site === "YouTube") ||
    videos?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos?.find((v) => v.site === "YouTube");

  if (!trailer) return null;

  return (
    <section className="px-4 md:px-8 mt-8 md:mt-12 mb-12 md:mb-16">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white tracking-tight">
        Trailer
      </h2>

      {/* Video Container: Aspect ratio locked to 16:9 */}
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1&autohide=1`}
            title={trailer.key}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Subtle caption for mobile clarity */}
        {/* <p className="mt-3 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
            {trailer.name || "Official Video"}
          </p> */}
      </div>
    </section>
  );
}
