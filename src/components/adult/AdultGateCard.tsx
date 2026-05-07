"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function AdultGateCard({ movie }: { movie: any }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    const email = prompt("Enter your email");

    const confirmed = confirm("Are you 18+?");

    if (email && confirmed) {
      setUnlocked(true);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <Image
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className={`h-full w-full object-cover transition ${
          unlocked ? "" : "scale-110 blur-xl"
        }`}
      />

      {!unlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center">
          <div className="mb-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold">
            18+
          </div>

          <Lock className="mb-3 size-8 text-white" />

          <button
            onClick={handleUnlock}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Unlock Content
          </button>
        </div>
      )}
    </div>
  );
}
