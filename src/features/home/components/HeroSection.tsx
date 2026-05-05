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
      <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: "grey.900" }}
        />
      </div>
    );
  }

  return (
    <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden bg-neutral-950">
      {/* Background Image with Layered Overlays */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image
          src={imageUrl}
          alt="Featured Content"
          fill
          priority
          className={`object-cover object-top transition-all duration-700 brightness-75 ${
            imageLoaded ? "scale-100 blur-0" : "scale-105 blur-lg"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />

        {/* Cinematic Gradient Mask (The "Netflix/Prime" Secret) */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-neutral-950/80 via-transparent to-transparent hidden md:block" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-12 md:px-16 md:pb-24 lg:px-24">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="mb-4 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-bold tracking-widest text-blue-400 uppercase border border-blue-500/30">
            Featured Content
          </span>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Experience the <span className="text-blue-500">Ultimate</span> Story
          </h1>

          <p className="mb-8 max-w-xl text-lg text-neutral-300 md:text-xl font-light leading-relaxed">
            Stream thousands of titles instantly. From award-winning originals
            to timeless classics, your next favorite story starts here.
          </p>

          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
