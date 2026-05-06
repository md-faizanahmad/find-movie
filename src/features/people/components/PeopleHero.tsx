// features/people/components/PeopleHero.tsx

import { PeopleHeroSlider } from "./PeopleHeroSlider";
import { PeopleSearch } from "./PeopleSearch";

interface Props {
  people: any[];
}

export function PeopleHero({ people }: Props) {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <PeopleHeroSlider people={people} />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-5xl text-4xl font-black md:text-6xl lg:text-7xl">
          Discover Actors & Actresses
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-neutral-300 md:text-lg">
          Explore Hollywood stars, Bollywood legends, Korean actors, Japanese
          celebrities, and global entertainment icons.
        </p>

        <div className="mt-8 w-full max-w-2xl">
          <PeopleSearch />
        </div>
      </div>
    </section>
  );
}
