"use client";

import Image from "next/image";

import Link from "next/link";

import { Star, PlayCircle } from "lucide-react";

import { Media } from "../services/home.service";

import { isAdultContent } from "@/lib/isAdultContent";

import { useAuthModal } from "@/context/auth-modal.context";

interface MediaCardProps {
  item: Media;

  isAuthenticated?: boolean;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MediaCard({ item, isAuthenticated = false }: MediaCardProps) {
  const authModal = useAuthModal();

  /**
   * Lock adult content
   * only for guests.
   */
  const isLocked = isAdultContent(item) && !isAuthenticated;

  const imageUrl = item.poster ? `${IMAGE_BASE_URL}/w500${item.poster}` : null;

  const year = item.releaseDate
    ? new Date(item.releaseDate).getFullYear()
    : "TBD";

  return (
    <div className="group relative block w-full min-w-0 overflow-hidden rounded-xl">
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 px-4 text-center backdrop-blur-sm">
          <div className="mb-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            18+
          </div>

          <p className="mb-4 text-sm font-semibold text-white">
            Login to Explore Mature Content
          </p>

          <button
            onClick={() => authModal.openModal()}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
          >
            Login to Continue
          </button>
        </div>
      )}

      <Link
        href={`/${item.mediaType}/${item.id}`}
        className={`block ${isLocked ? "pointer-events-none" : ""}`}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-neutral-900 ring-offset-black transition-all duration-500 group-hover:ring-2 group-hover:ring-red-600/80 group-hover:ring-offset-2 md:group-hover:ring-offset-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              loading="lazy"
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 768px) 33vw,
                (max-width: 1024px) 25vw,
                16vw
              "
              className="
                origin-center object-cover
                transition-all duration-700 ease-out
                group-hover:scale-105
                group-hover:brightness-50
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-700">
              <PlayCircle size={42} strokeWidth={1} />
            </div>
          )}

          {/* Rating */}
          <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/50 px-1.5 py-0.5 backdrop-blur-md md:px-2 md:py-1">
            <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

            <span className="text-[9px] font-bold text-white md:text-xs">
              {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-[11px] font-bold text-neutral-200 transition-colors group-hover:text-red-500 sm:text-xs md:text-sm lg:text-base">
          {item.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500 md:gap-2 md:text-xs">
          <span>{year}</span>

          <span className="h-1 w-1 rounded-full bg-neutral-800" />

          <span className="uppercase tracking-widest">{item.mediaType}</span>
        </div>
      </Link>
    </div>
  );
}
