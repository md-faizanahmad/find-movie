"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PersonMeta } from "./PersonMeta";
import { PersonAliases } from "./PersonAliases";
import { Sparkles, Star, ChevronLeft } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface Props {
  person: any;
}

export function PersonHero({ person }: Props) {
  const router = useRouter();

  const imageUrl = person.profile_path
    ? `${IMAGE_BASE_URL}/w780${person.profile_path}`
    : null;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-neutral-950 pb-12 pt-24 md:pb-20 md:pt-36">
      {/* 1. Action Bar: Floating Back Button */}
      <nav className="absolute top-6 left-4 z-10 md:top-20 md:left-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 active:scale-95 md:px-5 md:py-2.5"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest md:text-sm">
            Back
          </span>
        </button>
      </nav>

      {/* 2. Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-red-900/10 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:gap-12">
          {/* Profile Image */}
          <div className="relative aspect-2/3 w-52 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl transition-transform duration-500 hover:rotate-1 md:w-72 lg:w-80">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={person.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 208px, 320px"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-neutral-900 text-neutral-700">
                <Star className="h-20 w-20" />
              </div>
            )}
          </div>

          {/* Info Details */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 md:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              {person.known_for_department || "Talent"}
            </span>

            <h1 className="max-w-4xl text-4xl font-black italic uppercase tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl">
              {person.name}
            </h1>

            <PersonMeta person={person} />

            <div className="mt-4">
              <PersonAliases aliases={person.also_known_as} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
