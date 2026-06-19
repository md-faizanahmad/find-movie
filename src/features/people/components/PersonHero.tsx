"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";
import { PersonMeta } from "./PersonMeta";
import { PersonAliases } from "./PersonAliases";

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
    <section className="relative border-b border-white/10 bg-black">
      <div className="absolute inset-0 bg-linear-to-b from-neutral-900/40 to-black" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-10 inline-flex cursor-pointer font-b items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-end lg:grid-cols-[320px_1fr]">
          {/* Portrait */}
          <div className="relative mx-auto aspect-2/3 w-56 overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 md:mx-0 md:w-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={person.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 224px, 320px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-700">
                <Star className="h-16 w-16" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
              {person.known_for_department || "Talent"}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {person.name}
            </h1>

            <div className="mt-8">
              <PersonMeta person={person} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <PersonAliases aliases={person.also_known_as} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
