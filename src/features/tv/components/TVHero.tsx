import { TVHeroSlider } from "./TVHeroSlider";
import { TVSearch } from "./TVSearch";

interface Props {
  shows: any[];
}

export function TVHero({ shows }: Props) {
  return (
    <section className="relative h-[85vh] overflow-hidden mt-10">
      <TVHeroSlider shows={shows} />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-5xl text-4xl font-black md:text-6xl lg:text-7xl">
          Discover TV Shows From Around The World
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-neutral-300 md:text-lg">
          Explore Hollywood series, K-Dramas, Anime, Indian TV, Spanish
          thrillers, Japanese dramas, and trending global TV content.
        </p>

        <div className="mt-8 w-full max-w-2xl">
          <TVSearch />
        </div>
      </div>
    </section>
  );
}
