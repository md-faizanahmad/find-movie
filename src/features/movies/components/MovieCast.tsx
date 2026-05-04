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
    <section className="px-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Top Cast
      </h2>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide hover:scrollbar-default">
        {cast.slice(0, 12).map((actor) => (
          <div
            key={actor.id}
            className="w-32 flex-shrink-0 group cursor-default"
          >
            {/* Actor Image */}
            <div className="relative w-32 h-44 mb-3 overflow-hidden rounded-xl bg-gray-800 border border-white/5 shadow-md">
              {actor.profile_path ? (
                <Image
                  src={`${IMAGE_BASE}${actor.profile_path}`}
                  alt={actor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Actor Info */}
            <div className="space-y-1 px-1">
              <p className="text-sm font-bold text-white leading-tight truncate">
                {actor.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
