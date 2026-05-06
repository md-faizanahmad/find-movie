// features/people/components/PersonCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface Props {
  person: any;
}

export function PersonCard({ person }: Props) {
  const imageUrl = person.profile_path
    ? `${IMAGE_BASE_URL}/w500${person.profile_path}`
    : null;

  return (
    <Link href={`/person/${person.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-neutral-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            width={500}
            height={750}
            className="aspect-2/3 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-2/3 bg-neutral-900" />
        )}
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 text-sm font-bold text-white">
          {person.name}
        </h3>

        <p className="text-xs text-neutral-500">
          {person.known_for_department}
        </p>
      </div>
    </Link>
  );
}
