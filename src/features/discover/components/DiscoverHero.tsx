import { DiscoverHeroSlider } from "./DiscoverHeroSlider";
import { DiscoverSearch } from "./DiscoverSearch";

interface Props {
  movies: any[];
}

export function DiscoverHero({ movies }: Props) {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <DiscoverHeroSlider movies={movies} />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/30" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-4xl text-4xl font-black md:text-6xl lg:text-7xl">
          Discover Movies From Around The World
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-neutral-300 md:text-lg">
          Explore trending Hollywood, Bollywood, Korean, Japanese, Spanish,
          Tamil, Telugu, and global cinema.
        </p>

        <div className="mt-8 w-full max-w-2xl">
          <DiscoverSearch />
        </div>
      </div>
    </section>
  );
}
