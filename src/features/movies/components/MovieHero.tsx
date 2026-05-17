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

  // for dynamic font size
  // Dynamic Title Sizing Strategy
  const getTitleSizeClass = (text: string) => {
    if (text.length > 35) return "text-2xl md:text-5xl"; // Safe minimum size for massive titles
    if (text.length > 15) return "text-3xl md:text-6xl"; // Intermediate size
    return "text-4xl md:text-7xl"; // Original default size for short titles
  };

  // Dynamic Tagline Sizing Strategy
  const getTaglineSizeClass = (text: string) => {
    if (text.length > 80) return "text-base md:text-xl"; // Shrunk down to fit long descriptions
    return "text-lg md:text-2xl"; // Original default size
  };

  return (
    // <section className="relative mt-8 h-[65vh] md:h-[85vh] w-full overflow-hidden bg-black">
    <section className="relative pt-20 md:pt-24 lg:pt-24 h-[65vh] md:h-[85vh] w-full overflow-hidden bg-black">
      {/* 1. Base Layer: Visuals */}
      <div className="absolute inset-0 z-0">
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

        {trailerKey && (
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover scale-[1.3] brightness-[0.7] object-top md:object-[center_25%]"
                onLoad={() => setIsVideoLoaded(true)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Middle Layer: Gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent hidden md:block" />
      </div>

      {/* 3. Top Layer: Action Bar (Increased Top Margin) */}
      {/* 3. Top Layer: Action Bar */}
      <nav className="absolute top-6 left-6 md:top-28 md:left-12 z-10">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-5 py-2.5 bg-black/50 hover:bg-red-600 backdrop-blur-xl text-white rounded-full transition-all border border-white/20 shadow-2xl active:scale-95"
        >
          <ChevronLeftIcon />
          <span className="text-sm md:text-base font-bold tracking-wide">
            Back
          </span>
        </button>
      </nav>

      {/* 4. Content Layer */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-20 max-w-6xl pointer-events-none">
        <div className="max-w-3xl space-y-6 pointer-events-auto">
          <h1
            className={`${getTitleSizeClass(title)} font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl italic uppercase`}
          >
            {title}
          </h1>

          {tagline && (
            <div className="flex items-center gap-4">
              <span className="h-10 md:h-12 w-1.5 bg-red-600 rounded-full shrink-0" />
              <p
                className={`text-gray-100 ${getTaglineSizeClass(tagline)} font-light italic leading-relaxed max-w-xl`}
              >
                {tagline}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="group-hover:-translate-x-1 transition-transform"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
