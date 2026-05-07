import Image from "next/image";

import { PersonMeta } from "./PersonMeta";
import { PersonAliases } from "./PersonAliases";
import { Sparkles, Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface Props {
  person: any;
}

export function PersonHero({ person }: Props) {
  const imageUrl = person.profile_path
    ? `${IMAGE_BASE_URL}/w780${person.profile_path}`
    : null;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-neutral-950 pb-12 pt-20 md:pb-20 md:pt-32">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-red-900/10 via-transparent to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:gap-12">
          {/* Image */}
          <div className="relative aspect-2/3 w-56 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl md:w-72 lg:w-80">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={person.name}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 224px, 320px"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-neutral-900 text-neutral-700">
                <Star className="h-20 w-20" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              <Sparkles className="h-3.5 w-3.5" />

              {person.known_for_department || "Talent"}
            </span>

            <h1 className="max-w-4xl text-4xl font-black italic uppercase tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl">
              {person.name}
            </h1>

            <PersonMeta person={person} />

            <PersonAliases aliases={person.also_known_as} />
          </div>
        </div>
      </div>
    </section>
  );
}
