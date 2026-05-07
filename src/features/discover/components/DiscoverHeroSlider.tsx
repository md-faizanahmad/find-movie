"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Props {
  movies: any[];
}

export function DiscoverHeroSlider({ movies }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!movies?.length) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies?.length]);

  return (
    <div className="absolute inset-0 z-0 bg-neutral-950">
      {movies.map((movie, index) => {
        const isActive = index === active;

        return (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {movie.backdrop_path && (
              <Image
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                fill
                priority={index === 0} // Only prioritize the first slide
                className="object-cover object-top md:object-[center_25%]"
                sizes="100vw"
                quality={90}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
