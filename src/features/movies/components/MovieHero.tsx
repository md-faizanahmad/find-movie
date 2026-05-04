"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
  trailerKey?: string | null; // Pass the YouTube key here
}

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export function MovieHero({
  title,
  backdrop_path,
  tagline,
  trailerKey,
}: Props) {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  if (!backdrop_path) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-black">
      {/* 1. Backdrop Image (Always present as fallback/underlay) */}
      <Image
        src={`${BACKDROP_BASE}${backdrop_path}`}
        alt={title}
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />

      {/* 2. Video Background (YouTube Embed) */}
      {trailerKey && (
        <div className="absolute inset-0 pointer-events-none scale-110">
          {/* scale-110 hides the black bars and YouTube logo edges */}
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&showinfo=0&rel=0&iv_load_policy=3&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover"
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      )}

      {/* 3. Overlays (Ensures text remains readable over video) */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-black/30" />

      {/* 4. Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 
                   bg-black/30 hover:bg-black/50 backdrop-blur-md 
                   text-white rounded-full transition-all border border-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* 5. Content */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
          {title}
        </h1>
        {tagline && (
          <p className="text-gray-200 mt-4 text-lg md:text-xl italic drop-shadow-md">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
