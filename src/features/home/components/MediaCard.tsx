"use client";

import Image from "next/image";
import { Star, PlayCircle } from "lucide-react";
import Link from "next/link";
import { TMDBMovie } from "@/@types/movie.types";

interface MediaCardProps {
  movie: TMDBMovie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MediaCard({ movie }: MediaCardProps) {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "TBD";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block w-35 flex-none outline-none md:w-50 lg:w-60"
    >
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-neutral-900 ring-offset-black transition-all duration-500 group-hover:ring-2 group-hover:ring-red-600 group-hover:ring-offset-4 md:rounded-xl">
        {/* Poster Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 140px, (max-width: 1200px) 200px, 240px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-50"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-neutral-700">
            <PlayCircle size={40} strokeWidth={1} />
          </div>
        )}

        {/* Rating Badge (Glassmorphism) */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 backdrop-blur-md md:px-2 md:py-1">
          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />
          <span className="text-[9px] font-bold text-white md:text-xs">
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "NEW"}
          </span>
        </div>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <PlayCircle className="text-white drop-shadow-2xl" size={42} />
        </div>
      </div>

      {/* Content Info - Updated for Premium Theme */}
      <div className="mt-3 space-y-1 px-1">
        <h3 className="line-clamp-1 text-xs font-bold text-neutral-200 transition-colors group-hover:text-red-500 md:text-sm lg:text-base">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-[9px] font-medium text-neutral-500 md:text-xs">
          <span>{year}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-800" />
          <span className="uppercase tracking-widest">Movie</span>
        </div>
      </div>
    </Link>
  );
}
