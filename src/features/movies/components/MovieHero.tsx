"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
  trailerKey?: string | null;
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
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black">
      {/* 1. Backdrop Image (Fallback and Overlay Underlay) */}
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

      {/* 2. Netflix-Style Full Size Video Background */}
      {trailerKey && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&showinfo=0&rel=0&iv_load_policy=3&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              allow="autoplay; encrypted-media"
              className="w-full h-full object-cover scale-[1.3] md:scale-[1.1]"
              onLoad={() => setIsVideoLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* 3. Gradient Overlays - Netflix use deep bottom blacks and subtle top vignettes */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent hidden md:block" />
      <div className="absolute inset-0 bg-black/20" />

      {/* 4. Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 
                   bg-black/30 hover:bg-black/60 backdrop-blur-md 
                   text-white rounded-full transition-all border border-white/10 active:scale-95"
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

      {/* 5. Content - Mobile First Alignment */}
      <div className="relative z-20 flex h-full flex-col justify-end p-6 md:p-16 max-w-5xl">
        <div className="space-y-4 mb-4">
          <h1 className="text-3xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            {title}
          </h1>
          {tagline && (
            <p className="text-gray-200 text-base md:text-2xl font-medium max-w-2xl drop-shadow-lg leading-relaxed border-l-4 border-yellow-500 pl-4">
              {tagline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
