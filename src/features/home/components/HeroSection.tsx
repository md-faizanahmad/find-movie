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
      <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: "neutral.900" }}
        />
      </div>
    );
  }

  return (
    <section className="relative h-[85vh] w-full pt-20 overflow-hidden bg-black md:h-screen">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Featured"
          fill
          priority
          className={`object-cover object-top transition-all duration-1000 brightness-[0.5] ${
            imageLoaded ? "scale-100 blur-0" : "scale-110 blur-2xl"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />

        {/* Layered Cinematic Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-black/60 via-transparent to-transparent md:block" />
      </div>

      {/* Content Layer - Adjusted to justify-center to avoid SearchBar overlap */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 md:text-xs">
              Exclusive Premiere
            </span>
          </div>

          <h1 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
            The <span className="text-red-600">Ultimate</span> <br />{" "}
            Storytelling.
          </h1>

          <p className="mb-10 max-w-xl text-base font-medium leading-relaxed text-neutral-400 md:text-xl md:leading-loose">
            Experience the next generation of cinema. Stream award-winning
            originals and blockbuster hits in stunning quality.
          </p>

          {/* SearchBar Container */}
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Bottom Fade: Ensures the MediaRow transition is seamless */}
      <div className="absolute bottom-0 h-40 w-full bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
