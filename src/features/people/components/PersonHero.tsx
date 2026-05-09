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
    ? `${IMAGE_BASE_URL}/h632${person.profile_path}` // h632 is better for portraits
    : null;

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black pb-12 pt-20 md:pb-24 md:pt-32">
      {/* 1. Action Bar: Compact Back Button */}
      <nav className="absolute top-6 left-6 z-30">
        <button
          onClick={() => router.back()}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-xl transition-all hover:bg-red-600 hover:border-red-600 active:scale-90 md:h-11 md:w-11"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
      </nav>

      {/* 2. Background Visuals */}
      <div className="absolute inset-0 z-0">
        {/* Subtle red spotlight behind the headshot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          {/* Circular Profile Image */}
          <div className="relative h-48 w-48 shrink-0 md:h-64 md:w-64 lg:h-80 lg:w-80">
            <div className="h-full w-full overflow-hidden rounded-full border-4 border-white/5 bg-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={person.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 320px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-neutral-900 text-neutral-800">
                  <Star className="h-24 w-24" />
                </div>
              )}
            </div>
            {/* Glow effect behind circle */}
            <div className="absolute -inset-1 z-[-1] rounded-full bg-linear-to-tr from-red-600/20 to-transparent opacity-50 blur-xl" />
          </div>

          {/* Info Details */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                <Sparkles className="h-3 w-3 fill-white" />
                {person.known_for_department || "Talent"}
              </span>
              {person.popularity && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Rating Score: {person.popularity.toFixed(0)}
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-9xl leading-[0.8] italic">
              {person.name}
            </h1>

            <div className="mt-6 w-full opacity-80">
              <PersonMeta person={person} />
            </div>

            {person.also_known_as && person.also_known_as.length > 0 && (
              <div className="mt-6 hidden md:block">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Also Known As
                </p>
                <PersonAliases aliases={person.also_known_as} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
