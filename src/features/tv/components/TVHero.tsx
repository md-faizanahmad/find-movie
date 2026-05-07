"use client";

import { useEffect, useState } from "react";
import { TVHeroSlider } from "./TVHeroSlider";
import { TVSearch } from "./TVSearch";

interface Props {
  shows: any[];
}

export function TVHero({ shows }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Sync content with Slider timing (5s)
  useEffect(() => {
    if (!shows?.length) return;

    const interval = setInterval(() => {
      setIsFading(true);

      // Delay state update slightly to allow fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % shows.length);
        setIsFading(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [shows?.length]);

  const activeShow = shows[currentIndex];

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* 1. Background TV Slider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-90" />
        <TVHeroSlider shows={shows} />
      </div>

      {/* 2. Layered Overlays */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* 3. Content Area */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-24 md:pt-32">
        <div
          className={`max-w-5xl space-y-6 transition-all duration-700 ease-in-out ${
            isFading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Dynamic Series Title */}
          <h1 className="text-4xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl uppercase italic leading-[0.85] text-white">
            {activeShow?.name || "Discover TV Shows"}
          </h1>

          {/* Series Overview with Clamping */}
          <p className="mx-auto max-w-2xl text-balance text-sm font-medium text-neutral-300 md:text-lg lg:text-xl line-clamp-2 md:line-clamp-3 leading-relaxed">
            {activeShow?.overview ||
              "Explore K-Dramas, Anime, and trending global series."}
          </p>

          {/* Search Bar - Static positioning, themed shadow */}
          <div className="mx-auto mt-10 w-full max-w-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <TVSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
