///////////////// With Adult Content Modal
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Media } from "../services/home.service";
import { AdultVerificationModal } from "@/components/adult/AdultVerificationModal";
import { isAdultContent } from "@/lib/isAdultContent";
import { useMemo } from "react";

interface MediaCardProps {
  item: Media;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MediaCard({ item }: MediaCardProps) {
  const [adultUnlocked, setAdultUnlocked] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("adult-unlocked") === "true";
  });

  const [showVerification, setShowVerification] = useState(false);

  const imageUrl = item.poster ? `${IMAGE_BASE_URL}/w500${item.poster}` : null;

  const year = item.releaseDate
    ? new Date(item.releaseDate).getFullYear()
    : "TBD";

  // const isAdult = isAdultContent(item);
  const isAdult = useMemo(() => isAdultContent(item), [item]);

  const isLocked = isAdult && !adultUnlocked;

  const CardContent = (
    <>
      {/* Poster */}
      <div className="relative aspect-2/3  w-full overflow-hidden rounded-xl bg-neutral-900 ring-offset-black transition-all duration-500 group-hover:ring-2 group-hover:ring-red-600/80 group-hover:ring-offset-2 md:group-hover:ring-offset-4">
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
            className={`object-cover transition-all duration-700 ease-out ${
              !isLocked
                ? "group-hover:scale-105 group-hover:brightness-50 origin-center"
                : ""
            } ${isLocked ? "scale-110 blur-2xl brightness-50 " : ""}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-700">
            <PlayCircle size={42} strokeWidth={1} />
          </div>
        )}

        {/* Rating */}
        {/* <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/50 px-1.5 py-0.5 backdrop-blur-md md:px-2 md:py-1">
          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

          <span className="text-[9px] font-bold text-white md:text-xs">
            {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
          </span>
        </div> */}
        <div className="absolute left-3 top-3 z-10">
          <div className="rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md">
            <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

            <span className="text-[9px] font-bold text-white md:text-xs">
              {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
            </span>
          </div>
        </div>

        <div className="absolute right-3 top-3 z-10"></div>

        {/* Hover Play */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle className="text-white drop-shadow-2xl" size={44} />
          </div>
        )}

        {/* Adult Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 px-6 text-center backdrop-blur-md">
            {/* 18+ Badge */}
            <div className="mb-4 rounded-full border border-red-500/30 bg-red-600/20 px-4 py-1 text-xs font-black tracking-[0.25em] text-red-500">
              18+ MATURE CONTENT
            </div>

            {/* Heading */}
            <h3 className="max-w-xs text-xl font-black text-white">
              Login to Explore Mature Content
            </h3>

            {/* Description */}
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-300">
              This content may include mature themes, violence, or adult
              material intended for viewers aged 18 and above.
            </p>

            {/* Disclaimer */}
            <p className="mt-2 max-w-xs text-xs text-neutral-500">
              Age verification helps provide a safer and more personalized
              viewing experience.
            </p>

            {/* CTA */}
            <button
              onClick={(event) => {
                event.preventDefault();

                setShowVerification(true);
              }}
              className="mt-6 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03] hover:bg-red-500 active:scale-[0.98]"
            >
              Verify & Continue
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2.5 space-y-1 px-0.5 sm:mt-3">
        {isLocked ? (
          <>
            <div className="h-4 w-24 rounded bg-neutral-800" />

            <div className="flex items-center gap-2">
              <div className="h-3 w-10 rounded bg-neutral-900" />

              <div className="h-1 w-1 rounded-full bg-neutral-800" />

              <div className="h-3 w-12 rounded bg-neutral-900" />
            </div>
          </>
        ) : (
          <>
            <h3 className="line-clamp-1 text-[11px] font-bold text-neutral-200 transition-colors group-hover:text-red-500 sm:text-xs md:text-sm lg:text-base">
              {item.title}
            </h3>

            <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500 md:gap-2 md:text-xs">
              <span>{year}</span>

              <span className="h-1 w-1 rounded-full bg-neutral-800" />

              <span className="uppercase tracking-widest">
                {item.mediaType}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Verification Modal */}
      <AdultVerificationModal
        open={showVerification}
        onClose={() => setShowVerification(false)}
        onSuccess={() => setAdultUnlocked(true)}
      />
    </>
  );

  if (isLocked) {
    return (
      <div className="group block w-full min-w-0 outline-none">
        {CardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/${item.mediaType}/${item.id}`}
      className="group block w-full min-w-0 outline-none"
    >
      {CardContent}
    </Link>
  );
}
