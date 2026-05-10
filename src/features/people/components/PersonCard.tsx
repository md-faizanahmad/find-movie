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
          // <div className="aspect-2/3 bg-neutral-900" />
          <div
            className="
    aspect-2/3
    animate-pulse
    bg-linear-to-br
    from-neutral-800
    via-neutral-900
    to-black
    flex
    items-center
    justify-center
  "
          >
            <div className="text-center px-4">
              <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.5-1.632Z"
                  />
                </svg>
              </div>

              <p className="text-xs font-medium text-neutral-500">No Image</p>
            </div>
          </div>
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
