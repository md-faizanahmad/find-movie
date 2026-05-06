// features/people/components/PeopleHero.tsx

import { PeopleHeroSlider } from "./PeopleHeroSlider";
import { PeopleSearch } from "./PeopleSearch";

interface Props {
  people: any[];
}

export function PeopleHero({ people }: Props) {
  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <PeopleHeroSlider people={people} />
      </div>

      {/* Cinematic Overlays - Ensuring top nav area is dark and bottom is clear */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* Content Layer - Added padding-top to avoid nav overlap */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-16 md:pt-24">
        <div className="max-w-5xl space-y-6">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl uppercase italic leading-[0.9]">
            Discover <br className="hidden md:block" />
            <span className="text-amber-500">Actors & Actresses</span>
          </h1>

          <p className="mx-auto max-w-2xl text-balance text-sm font-medium text-neutral-300 md:text-xl md:leading-relaxed">
            Explore Hollywood stars, Bollywood legends, and global entertainment
            icons.
          </p>

          <div className="mx-auto mt-8 w-full max-w-2xl">
            <PeopleSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
