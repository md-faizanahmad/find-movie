"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  backdrop_path: string | null;
  tagline: string | null;
}

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export function MovieHero({ title, backdrop_path, tagline }: Props) {
  const router = useRouter();

  if (!backdrop_path) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Next.js Optimized Image */}
      <Image
        src={`${BACKDROP_BASE}${backdrop_path}`}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 
                   bg-black/30 hover:bg-black/50 backdrop-blur-md 
                   text-white rounded-full transition-all border border-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
        {tagline && (
          <p className="text-gray-300 mt-4 text-lg md:text-xl italic">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
