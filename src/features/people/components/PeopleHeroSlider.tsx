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
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % people.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [people.length]);

  return (
    <div className="absolute inset-0">
      {people.map((person, index) => {
        const isActive = index === active;

        const imageUrl = person.profile_path
          ? `${IMAGE_BASE_URL}${person.profile_path}`
          : null;

        return (
          <div
            key={person.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={person.name}
                fill
                priority
                className="object-cover"
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
