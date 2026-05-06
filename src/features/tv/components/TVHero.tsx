import { TVHeroSlider } from "./TVHeroSlider";
import { TVSearch } from "./TVSearch";

interface Props {
  shows: any[];
}

export function TVHero({ shows }: Props) {
  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* 1. Background TV Slider */}
      <div className="absolute inset-0 z-0">
        <TVHeroSlider shows={shows} />
      </div>

      {/* 2. Layered Overlays for Depth */}
      {/* Top Vignette - Blends with Navbar */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-transparent opacity-90" />
      {/* Bottom Blackout - Blends with Grid */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/20 to-transparent" />
      {/* Dimming for Readability */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* 3. Content Area */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pt-16 md:pt-24">
        <div className="max-w-5xl space-y-5">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl uppercase italic leading-[0.85]">
            Discover TV Shows <br className="hidden md:block" />
            <span className="text-blue-500">From Around The World</span>
          </h1>

          <p className="mx-auto max-w-2xl text-balance text-sm font-medium text-neutral-300 md:text-xl md:leading-relaxed">
            Explore K-Dramas, Anime, Hollywood series, and trending global TV
            content all in one place.
          </p>

          <div className="mx-auto mt-10 w-full max-w-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <TVSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
