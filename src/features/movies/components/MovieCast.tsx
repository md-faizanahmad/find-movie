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
    <section className="px-4 md:px-8 mt-8 md:mt-12">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white tracking-tight">
        Top Cast
      </h2>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-3 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {cast.slice(0, 12).map((actor) => (
          <div
            key={actor.id}
            className="w-24 md:w-32 shrink-0 group cursor-default"
          >
            {/* Actor Image - Responsive sizing */}
            <div className="relative w-24 h-32 md:w-32 md:h-44 mb-2 md:mb-3 overflow-hidden rounded-lg md:rounded-xl bg-gray-900 border border-white/5 shadow-md">
              {actor.profile_path ? (
                <Image
                  src={`${IMAGE_BASE}${actor.profile_path}`}
                  alt={actor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Actor Info - Compact typography */}
            <div className="space-y-0.5 px-0.5">
              <p className="text-[12px] md:text-sm font-bold text-white leading-tight truncate">
                {actor.name}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
