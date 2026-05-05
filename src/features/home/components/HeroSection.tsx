"use client";

import Image from "next/image";
import { Skeleton } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

interface Props {
  backdropPath: string | null;
  isLoading?: boolean;
}

export function HeroSection({ backdropPath, isLoading = false }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/placeholder-hero.jpg";

  if (isLoading) {
    return (
      <div className="relative h-[70vh] md:h-[95vh] w-full overflow-hidden">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: "#0a0a0a" }}
        />
      </div>
    );
  }

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Layered Overlays */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image
          src={imageUrl}
          alt="Featured Content"
          fill
          priority
          className={`object-cover object-top transition-all duration-1000 brightness-[0.6] ${
            imageLoaded ? "scale-100 blur-0" : "scale-110 blur-2xl"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />

        {/* Cinematic Gradient Masks */}
        {/* Bottom-up: Darker and taller to blend with the negative margin rows */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        {/* Left-to-right: Deepens the 'text safe zone' */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-black/90 via-black/20 to-transparent md:block" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-6 pt-20 md:px-16 lg:px-24">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
          {/* Refined Badge */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600 md:w-12" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500 md:text-sm">
              Featured Selection
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
            The <span className="text-red-600">Ultimate</span>{" "}
            <br className="hidden md:block" />
            Cinematic Experience
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-neutral-400 md:text-2xl">
            Dive into thousands of award-winning movies and originals. Your
            journey through the best of cinema starts right here.
          </p>

          {/* Search Bar Wrapper - Positioned for Visibility */}
          <div className="w-full max-w-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Bottom Edge Fade - Ensures a smooth transition to the rows */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
