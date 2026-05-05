// import { Navbar } from "@/components/layout/navbar/Navbar";
// import { MoviesContainer } from "@/features/movies/containers/movies-container";
// import { getMovies } from "@/features/movies/api/getMovies";
// import { TMDBMovie } from "@/@types/movie.types";

import { HeroSection } from "@/features/home/components/HeroSection";
import { MediaRow } from "@/features/home/components/MediaRow";
import { getHomeData } from "@/features/home/services/home.service";
import { getMovies } from "@/features/movies/api/getMovies";

// async function getInitialMovies(): Promise<TMDBMovie[]> {
//   const data = await getMovies({ category: "trending" });
//   return data.results ?? [];
// }

// export default async function HomePage() {
//   const movies = await getInitialMovies();

//   return (
//     <>
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <MoviesContainer initialMovies={movies} />
//       </main>
//     </>
//   );
// }

// src/app/page.tsx

export default async function HomePage() {
  const { trending, bollywood, southIndian, indianTV } = await getHomeData();

  const heroMovie = trending?.[0] || null;

  return (
    <main className="relative min-h-screen bg-black selection:bg-red-600/30">
      <HeroSection
        backdropPath={heroMovie?.backdrop ?? null}
        isLoading={!heroMovie}
      />

      <div className="relative z-20 -mt-5 pb-20 md:-mt-10 lg:-mt-10">
        <div className="space-y-2 md:space-y-6">
          <MediaRow
            title="Trending Now"
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
