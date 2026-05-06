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
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="absolute inset-0">
      {movies.map((movie, index) => {
        const isActive = index === active;

        return (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
