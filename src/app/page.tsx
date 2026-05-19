import { getCurrentUser } from "@/features/Auth/lib/auth";
import { ImageCardRow } from "@/features/gallery/ImageCardRow";
import { HeroSection } from "@/features/home/components/HeroSection";
import { MediaRow } from "@/features/home/components/MediaRow";
import { getHomeData } from "@/features/home/services/home.service";
import { getGalleryRow } from "@/lib/gallery/getGalleryRow";

export default async function HomePage() {
  const { trending, bollywood, southIndian, indianTV, hollywoodTV } =
    await getHomeData();

  const hollywoodMovies = await getGalleryRow("hollywood-movies");

  const hollywoodSeries = await getGalleryRow("hollywood-series");

  const actors = await getGalleryRow("popular-actors");

  const heroMovie = trending?.[0] || null;
  const user = await getCurrentUser();

  return (
    <main className="relative min-h-screen bg-black selection:bg-red-600/30">
      <HeroSection
        backdropPath={heroMovie?.backdrop ?? null}
        isLoading={!heroMovie}
      />

      <div className="relative z-20 -mt-5 pb-20 md:-mt-6 lg:-mt-6">
        <div className="space-y-2 md:space-y-6">
          <MediaRow
            title="Hollywood"
            items={trending}
            href="/movies?with_original_language=en&page=1"
            isAuthenticated={!!user}
          />

          <MediaRow
            title="Bollywood"
            items={bollywood}
            href="/movies?with_original_language=hi&page=1"
            isAuthenticated={!!user}
          />

          <MediaRow
            title="South Indian"
            items={southIndian}
            href="/movies?with_original_language=ta&page=1"
            isAuthenticated={!!user}
          />
          <MediaRow
            title="Hollywood TV Shows"
            items={hollywoodTV}
            href="/tv?with_original_language=en"
            isAuthenticated={!!user}
          />
          <MediaRow
            title="Indian TV Shows"
            items={indianTV}
            href="/tv?with_original_language=hi"
            isAuthenticated={!!user}
          />

          {/* Gallery */}
          <ImageCardRow
            title={hollywoodMovies.title}
            href={`/gallery/${hollywoodMovies.slug}`}
            items={hollywoodMovies.items}
          />
          <ImageCardRow
            title={hollywoodSeries.title}
            href={`/gallery/${hollywoodSeries.slug}`}
            items={hollywoodSeries.items}
          />

          <ImageCardRow
            title={actors.title}
            href={`/gallery/${actors.slug}`}
            items={actors.items}
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

//// update with authmodal
