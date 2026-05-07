"use client";

import { useEffect, useState } from "react";
import { DiscoverHeroSlider } from "./DiscoverHeroSlider";
import { DiscoverSearch } from "./DiscoverSearch";

interface Props {
  movies: any[];
}

export function DiscoverHero({ movies }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsFading(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies?.length]);

  const activeMovie = movies[currentIndex];

  return (
    /* h-[80svh] is better for mobile browsers than [80vh] */
    <section className="relative h-[80svh] md:h-[90vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {/* Background Overlay to prevent image flickering */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-80" />
        <DiscoverHeroSlider movies={movies} />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* Content Container */}
      {/* Added safe-area-inset to handle mobile notches perfectly */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-[calc(--spacing(24)+env(safe-area-inset-top))] md:pt-32">
        <div
          className={`max-w-5xl space-y-6 transition-all duration-700 ease-out ${
            isFading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Dynamic Movie Title */}
          <h1 className="text-4xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl uppercase italic leading-[0.9] text-white">
            {activeMovie?.title || "Discover Movies"}
          </h1>

          {/* Shortened Overview */}
          <p className="mx-auto max-w-2xl text-balance text-sm font-medium text-neutral-300 md:text-lg line-clamp-2 md:line-clamp-3">
            {activeMovie?.overview ||
              "Explore trending global cinema in one place."}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 w-full max-w-2xl transform transition-all hover:scale-[1.01] active:scale-[0.99]">
            <DiscoverSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
