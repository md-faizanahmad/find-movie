import { DiscoverHeroSlider } from "./DiscoverHeroSlider";
import { DiscoverSearch } from "./DiscoverSearch";

interface Props {
  movies: any[];
}

export function DiscoverHero({ movies }: Props) {
  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* 1. The Background Slider */}
      <div className="absolute inset-0 z-0">
        <DiscoverHeroSlider movies={movies} />
      </div>

      {/* 2. Cinematic Overlays */}
      {/* Top Vignette (to blend with Nav) */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-80" />
      {/* Bottom Blackout (to blend with Content) */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/20 to-transparent" />
      {/* Overall Darken for Text Readability */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* 3. Content Container */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-16 md:pt-20">
        <div className="max-w-5xl space-y-4">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl uppercase italic leading-[0.9]">
            Discover Movies <br className="hidden md:block" />
            <span className="text-red-600">Around The World</span>
          </h1>

          <p className="mx-auto max-w-xl text-balance text-sm font-medium text-neutral-300 md:text-xl md:leading-relaxed">
            Explore trending Hollywood, Bollywood, Korean, Japanese, and global
            cinema in one place.
          </p>

          <div className="mx-auto mt-10 w-full max-w-2xl transform transition-all hover:scale-[1.01] active:scale-[0.99]">
            <DiscoverSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
