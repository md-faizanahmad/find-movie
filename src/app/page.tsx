import { HeroSection } from "@/features/home/components/HeroSection";
import { MediaRow } from "@/features/home/components/MediaRow";
import { getHomeData } from "@/features/home/services/home.service";

export default async function HomePage() {
  const { trending, bollywood, southIndian, indianTV, hollywoodTV } =
    await getHomeData();

  const heroMovie = trending?.[0] || null;

  return (
    <main className="relative min-h-screen bg-black selection:bg-red-600/30">
      <HeroSection
        backdropPath={heroMovie?.backdrop ?? null}
        isLoading={!heroMovie}
      />

      <div className="relative z-20 -mt-5 pb-20 md:-mt-8 lg:-mt-8">
        <div className="space-y-2 md:space-y-6">
          <MediaRow
            title="Hollywood"
            items={trending}
            href="/movies/category/trending"
          />

          <MediaRow
            title="Bollywood"
            items={bollywood}
            href="/movies/category/bollywood"
          />

          <MediaRow
            title="South Indian"
            items={southIndian}
            href="/movies/category/south"
          />

          <MediaRow
            title="Indian TV Shows"
            items={indianTV}
            href="/tv/indian"
          />
          <MediaRow
            title="Hollywood TV Shows"
            items={hollywoodTV}
            href="/tv/hollywood"
          />
        </div>
      </div>

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-red-900/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-900/5 blur-[120px]" />
      </div>
    </main>
  );
}
