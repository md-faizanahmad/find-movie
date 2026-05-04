"use client";

import Image from "next/image";
import type { Backdrop } from "@/@types/movie.details.types";

interface Props {
  backdrops: Backdrop[];
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export function MovieGallery({ backdrops }: Props) {
  if (!backdrops?.length) return null;

  return (
    <section className="px-4 md:px-8 mt-8 md:mt-12 mb-10">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white tracking-tight">
        Scenes
      </h2>

      {/* Carousel Container with Scroll Snapping */}
      <div className="flex gap-3 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
        {backdrops.slice(0, 10).map((img, i) => (
          <div
            key={i}
            className="relative w-[85vw] md:w-112.5 aspect-video shrink-0 
                       snap-center first:snap-start last:snap-end
                       rounded-xl md:rounded-2xl overflow-hidden 
                       border border-white/10 shadow-xl group cursor-pointer"
          >
            <Image
              src={`${IMAGE_BASE}${img.file_path}`}
              alt={`Scene ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 85vw, 450px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* View Icon (Visible on Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
