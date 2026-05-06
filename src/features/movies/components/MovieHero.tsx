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
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black mt-15">
      {/* 1. Backdrop Image */}
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

      {/* 2. Cinematic Video Background */}
      {trailerKey && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
              allow="autoplay; encrypted-media"
              className="w-full h-full object-cover scale-[1.3] brightness-[0.8] grayscale-[0.2]"
              onLoad={() => setIsVideoLoaded(true)}
            />
          </div>
          {/* Invisible Overlay to block interactions & show/pause icons */}
          <div className="absolute inset-0 bg-transparent" />
        </div>
      )}

      {/* 3. Layered Overlays for Depth */}
      <div className="absolute inset-0 z-10">
        {/* Bottom Black Out */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
        {/* Side Vignette */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent hidden md:block" />
      </div>

      {/* 4. Action Bar */}
      <nav className="absolute top-8 left-8 z-30">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-full transition-all border border-white/20"
        >
          <ChevronLeftIcon />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>
      </nav>

      {/* 5. Title & Tagline Content */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-20 max-w-6xl">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl italic uppercase">
            {title}
          </h1>

          {tagline && (
            <div className="flex items-center gap-4">
              <span className="h-12 w-1.5 bg-red-600 rounded-full" />
              <p className="text-gray-100 text-lg md:text-2xl font-light italic leading-relaxed max-w-xl drop-shadow">
                {tagline}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Internal SVG Helper to keep JSX clean */
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
