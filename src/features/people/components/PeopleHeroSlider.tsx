// features/people/components/PeopleHeroSlider.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Props {
  people: any[];
}

export function PeopleHeroSlider({ people }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!people.length) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % people.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [people.length]);

  return (
    <div className="relative h-full w-full">
      {people.map((person, index) => {
        const isActive = index === active;
        const imageUrl = person.profile_path
          ? `${IMAGE_BASE_URL}${person.profile_path}`
          : null;

        return (
          <div
            key={person.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={person.name}
                fill
                priority={index === 0}
                className="object-fill object-top" // People profiles look better with top-alignment
                sizes="100vw"
              />
            ) : (
              <div className="h-full w-full bg-neutral-900" />
            )}
          </div>
        );
      })}
    </div>
  );
}
