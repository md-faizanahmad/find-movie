"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Props {
  shows: any[];
}

export function TVHeroSlider({ shows }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % shows.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [shows.length]);

  return (
    <div className="absolute inset-0">
      {shows.map((show, index) => {
        const isActive = index === active;

        return (
          <div
            key={show.id}
            className={`absolute top-2 inset-0 transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`${IMAGE_BASE_URL}${show.backdrop_path}`}
              alt={show.name}
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
