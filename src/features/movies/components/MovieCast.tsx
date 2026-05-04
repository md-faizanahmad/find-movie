"use client";

import Image from "next/image";
import { CastMember } from "@/@types/movie.details.types";

interface Props {
  cast: CastMember[];
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

export function MovieCast({ cast }: Props) {
  if (!cast?.length) return null;

  return (
    <section className="px-4 md:px-8 mt-8 md:mt-12 group/section">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight border-l-4 border-yellow-500 pl-3">
          Top Cast
        </h2>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:block">
          Swipe to view
        </span>
      </div>

      {/* Horizontal Container with Scroll Snapping & Hidden Scrollbar */}
      <div
        className="flex gap-3 md:gap-5 overflow-x-auto pb-4 
                   snap-x snap-mandatory scroll-smooth
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {cast.slice(0, 15).map((actor) => (
          <div
            key={actor.id}
            className="w-28 md:w-36 shrink-0 snap-start group cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-2/3 w-full mb-3 overflow-hidden rounded-xl bg-gray-900 border border-white/10 shadow-lg transition-all duration-300 group-hover:border-yellow-500/50">
              {actor.profile_path ? (
                <Image
                  src={`${IMAGE_BASE}${actor.profile_path}`}
                  alt={actor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                  <svg
                    className="w-10 h-10 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}

              {/* Subtle Bottom Overlay for Depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info Section */}
            <div className="px-1">
              <p className="text-[13px] md:text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-yellow-500 transition-colors">
                {actor.name}
              </p>
              <p className="text-[11px] md:text-xs text-gray-500 leading-tight mt-1 line-clamp-1">
                {actor.character}
              </p>
            </div>
          </div>
        ))}

        {/* Optional: "View All" spacer/card */}
        <div className="shrink-0 w-4 md:w-8" aria-hidden="true" />
      </div>
    </section>
  );
}
