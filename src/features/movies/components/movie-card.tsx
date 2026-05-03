"use client";

import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Movie } from "@/@types/movie.types";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

// ✅ Client-safe constant (NO env usage here)
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : null;

  const year =
    movie.release_date && !isNaN(Date.parse(movie.release_date))
      ? new Date(movie.release_date).getFullYear()
      : null;

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Poster */}

        <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300">
              <Play className="w-8 h-8 mb-2 opacity-20" />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                No Preview
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute top-3 right-3 backdrop-blur-md bg-white/70 px-2 py-1 rounded-lg flex items-center gap-1 border shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-black text-gray-900">
              {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2">
            <p className="text-[11px] text-gray-400">{year || "TBD"}</p>
            <span className="w-1 h-1 bg-gray-200 rounded-full" />
            <p className="text-[11px] text-blue-500">Movie</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
