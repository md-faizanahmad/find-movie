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

  // Check if total items array exceeds 4
  const hasMoreThanFour = items.length > 4;

  // Only display the first 4 items in this preview/grid layout
  const displayedItems = favoriteItems.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {displayedItems.map((item) => (
          <div
            key={`${item.mediaType}-${item.id}`}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 transition-all hover:border-white/10"
          >
            {/* Favorite Button */}
            <div className="absolute right-3 top-3 z-40 cursor-pointer">
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
                      ? `https://image.tmdb.org/t/p/w500${item.poster}`
                      : "/placeholder.jpg"
                  }
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/10 to-transparent opacity-90" />

              {/* Rating badge */}
              <div className="absolute left-3 top-3 z-10">
                <div className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 backdrop-blur-md">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-[10px] font-bold text-white">
                    {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
                  </span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      {item.releaseDate
                        ? new Date(item.releaseDate).getFullYear()
                        : "Upcoming"}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
                    {item.mediaType}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Inline Mobile-First Callout Card: Shows up inside the grid sequence if items > 4 */}
        {hasMoreThanFour && (
          <Link
            href="/favorites"
            className="group relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/20 p-4 transition-all hover:bg-zinc-900/50 hover:border-red-500/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">
                +{items.length - 4} more items
              </p>
              <h4 className="mt-1 text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                Visit Favorites Page
              </h4>
              <p className="mt-1 text-[11px] leading-normal text-zinc-500">
                To manage, see your full list, or instantly update updates (like
                & unlike).
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                <span>Go now</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
