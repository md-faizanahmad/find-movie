"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Heart } from "lucide-react";
import { Media } from "@/features/home/services/home.service";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

interface FavoriteItemsGridProps {
  items: Media[];
  isAuthenticated?: boolean;
}

export function FavoriteItemsGrid({
  items,
  isAuthenticated = false,
}: FavoriteItemsGridProps) {
  const [favoriteItems, setFavoriteItems] = useState(items);

  const hasMoreThanFour = items.length > 4;
  const displayedItems = favoriteItems.slice(0, 4);

  return (
    // Explicit max-width locks layout to prevent huge overstretched cards on wide monitors
    <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto p-2">
      <div
        className="grid grid-cols-2 gap-3 
                   sm:grid-cols-3 sm:gap-4 
                   lg:grid-cols-4 lg:gap-4"
      >
        {displayedItems.map((item) => (
          <div
            key={`${item.mediaType}-${item.id}`}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 transition-all hover:border-white/10"
          >
            {/* Favorite Button */}
            <div className="absolute right-2 top-2 z-40 cursor-pointer scale-90">
              <FavoriteButton
                mediaId={item.id}
                mediaType={item.mediaType}
                initialFavorited={true}
                isAuthenticated={isAuthenticated}
                onOptimisticUnfavorite={() => {
                  setFavoriteItems((prev) =>
                    prev.filter(
                      (favoriteItem) =>
                        !(
                          favoriteItem.id === item.id &&
                          favoriteItem.mediaType === item.mediaType
                        ),
                    ),
                  );
                }}
              />
            </div>

            {/* Navigation Link */}
            <Link href={`/${item.mediaType}/${item.id}`}>
              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={
                    item.poster
                      ? `https://image.tmdb.org/t/p/w342${item.poster}` // Reduced resolution asset for smaller bounds
                      : "/placeholder.jpg"
                  }
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent opacity-90" />

              {/* Rating badge */}
              <div className="absolute left-2 top-2 z-10 scale-90">
                <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 backdrop-blur-md">
                  <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-[9px] font-bold text-white">
                    {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
                  </span>
                </div>
              </div>

              {/* Bottom Content (More compact padding) */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 text-xs font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-zinc-400">
                      {item.releaseDate
                        ? new Date(item.releaseDate).getFullYear()
                        : "Upcoming"}
                    </p>
                  </div>

                  <div className="w-fit shrink-0 rounded-md border border-white/10 bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
                    {item.mediaType}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Inline Mobile-First Callout Card */}
        {hasMoreThanFour && (
          <Link
            href="/favorites"
            className="group relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-xl border border-dashed border-zinc-700 bg-zinc-900/20 p-3 transition-all hover:bg-zinc-900/50 hover:border-red-500/50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500 scale-90">
              <Heart className="h-3.5 w-3.5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-zinc-400">
                +{items.length - 4} more items
              </p>
              <h4 className="mt-0.5 text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                Visit Favorites Page
              </h4>
              <p className="mt-0.5 text-[10px] leading-snug text-zinc-500 line-clamp-3 sm:line-clamp-none">
                To manage, see your full list, or instantly update updates (like
                & unlike).
              </p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-red-500">
                <span>Go now</span>
                <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
