import Link from "next/link";

import Image from "next/image";

import { Star } from "lucide-react";

import { Media } from "@/features/home/services/home.service";

interface FavoriteItemsGridProps {
  items: Media[];
}

export function FavoriteItemsGrid({ items }: FavoriteItemsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={`${item.mediaType}-${item.id}`}
          href={`/${item.mediaType}/${item.id}`}
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 transition-all hover:border-white/10"
        >
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={
                item.poster
                  ? `https://image.tmdb.org/t/p/w500${item.poster}`
                  : "/placeholder.jpg"
              }
              alt={item.title}
              fill
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                20vw
              "
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-90" />

          {/* Rating */}
          <div className="absolute left-3 top-3 z-10">
            <div className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 backdrop-blur-md">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />

              <span className="text-[10px] font-bold text-white">
                {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
              </span>
            </div>
          </div>

          {/* Type Badge */}
          <div className="absolute right-3 top-3 z-10">
            <div className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
              {item.mediaType}
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4">
            <h3 className="line-clamp-1 text-sm font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              {item.releaseDate
                ? new Date(item.releaseDate).getFullYear()
                : "Upcoming"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
