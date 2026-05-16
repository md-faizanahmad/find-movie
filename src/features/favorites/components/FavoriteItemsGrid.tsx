"use client";

/*
  This component MUST be client-side because:
  - user can instantly remove favorites
  - we use React state (useState)
  - server components cannot update UI interactively
*/

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { Star } from "lucide-react";

import { Media } from "@/features/home/services/home.service";

import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

interface FavoriteItemsGridProps {
  // All favorite media items from server
  items: Media[];

  // Authentication status
  isAuthenticated?: boolean;
}

export function FavoriteItemsGrid({
  items,

  isAuthenticated = false,
}: FavoriteItemsGridProps) {
  /*
    Local state copy of favorite items.

    Why needed?
    Because when user unfavorites:
    - item should disappear instantly
    - without page refresh
  */
  const [favoriteItems, setFavoriteItems] = useState(items);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {favoriteItems.map((item) => (
        <div
          key={`${item.mediaType}-${item.id}`}
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 transition-all hover:border-white/10"
        >
          {/* Favorite Button */}
          <div className="absolute right-3 top-3 z-40 cursor-pointer">
            <FavoriteButton
              // Media ID for toggle API
              mediaId={item.id}
              // movie or tv
              mediaType={item.mediaType}
              // Always true because this is favorites page
              initialFavorited={true}
              // Auth status
              isAuthenticated={isAuthenticated}
              /*
                Callback triggered after successful toggle.

                If item becomes unfavorited:
                remove it from local grid state instantly.
              */
              onToggle={(favorited) => {
                if (!favorited) {
                  setFavoriteItems((prev) =>
                    prev.filter(
                      (favoriteItem) =>
                        !(
                          favoriteItem.id === item.id &&
                          favoriteItem.mediaType === item.mediaType
                        ),
                    ),
                  );
                }
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
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 33vw,
                  20vw
                "
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
                {/* Title + Year */}
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

                {/* Media Type Badge */}
                <div className="shrink-0 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
                  {item.mediaType}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
