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
    <section className="px-8 mt-12 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
        Scenes
      </h2>

      {/* Horizontal Scroll Gallery */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide hover:scrollbar-default">
        {backdrops.slice(0, 10).map((img, i) => (
          <div
            key={i}
            className="relative w-[300px] md:w-[400px] aspect-video shrink-0 
                       rounded-2xl overflow-hidden border border-white/10 
                       shadow-xl group cursor-pointer"
          >
            <Image
              src={`${IMAGE_BASE}${img.file_path}`}
              alt={`Scene ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 300px, 400px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />

            {/* Subtle Overlay on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
