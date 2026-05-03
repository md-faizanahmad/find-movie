import Image from "next/image";
import { Star, MoreHorizontal, Play } from "lucide-react";
import { env } from "@/lib/config/env";
import { Movie } from "@/@types/movie.types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `${env.TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
    : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
      {/* Poster Section (Instagram Post Style) */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <Play className="w-8 h-8 mb-2 opacity-20" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Preview
            </span>
          </div>
        )}

        {/* Floating Rating Overlay */}
        <div className="absolute top-3 right-3 backdrop-blur-md bg-white/70 px-2 py-1 rounded-lg flex items-center gap-1 border border-white/50 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[11px] font-black text-gray-900">
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View Details
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
            {movie.title}
          </h3>
          <button className="text-gray-400 hover:text-black">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "Release TBD"}
          </p>
          <span className="w-1 h-1 bg-gray-200 rounded-full" />
          <p className="text-[11px] font-medium text-blue-500 uppercase">
            Movie
          </p>
        </div>
      </div>
    </div>
  );
}
