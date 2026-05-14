"use client";

import Link from "next/link";

import Image from "next/image";

import { Star } from "lucide-react";

import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

import { Media } from "../services/home.service";

interface ProtectedMediaCardProps {
  item: Media;

  href: string;

  isLocked?: boolean;

  isAuthenticated: boolean;

  isFavorited?: boolean;

  onRequireAuth: () => void;
}

export function ProtectedMediaCard({
  item,

  href,

  isLocked = false,

  isAuthenticated,

  isFavorited = false,

  onRequireAuth,
}: ProtectedMediaCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
        <Image
          src={
            item.poster
              ? `https://image.tmdb.org/t/p/w500${item.poster}`
              : "/placeholder.jpg"
          }
          alt={item.title}
          fill
          sizes="
            (max-width: 640px) 45vw,
            (max-width: 1024px) 25vw,
            16vw
          "
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-80" />

      {/* Rating */}
      <div className="absolute left-3 top-3 z-10">
        <div className="flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 backdrop-blur-md">
          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

          <span className="text-[9px] font-bold text-white md:text-xs">
            {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
          </span>
        </div>
      </div>

      {/* Favorite */}
      <div
        className="absolute right-3 top-3 z-30"
        onClick={(event) => {
          event.preventDefault();

          event.stopPropagation();
        }}
      >
        <FavoriteButton
          mediaId={item.id}
          initialFavorited={isFavorited}
          isAuthenticated={isAuthenticated}
          onRequireAuth={onRequireAuth}
        />
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <h3 className="line-clamp-1 text-sm font-black text-white md:text-base">
          {item.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300">
          {item.releaseDate
            ? new Date(item.releaseDate).getFullYear()
            : "Upcoming"}
        </p>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 px-6 text-center backdrop-blur-md">
          {/* Badge */}
          <div className="mb-4 rounded-full border border-red-500/30 bg-red-600/20 px-4 py-1 text-[10px] font-black tracking-[0.25em] text-red-500">
            18+ MATURE
          </div>

          {/* Title */}
          <h3 className="max-w-xs text-xl font-black text-white">
            Login to Explore Mature Content
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-300">
            This title may include mature themes, violence, or adult content
            intended for audiences aged 18 and above.
          </p>

          {/* Disclaimer */}
          <p className="mt-2 max-w-xs text-xs text-neutral-500">
            Age verification helps provide a safer and personalized experience.
          </p>

          {/* CTA */}
          <button
            onClick={(event) => {
              event.preventDefault();

              event.stopPropagation();

              onRequireAuth();
            }}
            className="mt-6 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03] hover:bg-red-500 active:scale-[0.98]"
          >
            Verify & Continue
          </button>
        </div>
      )}
    </Link>
  );
}
