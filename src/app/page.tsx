// import { Navbar } from "@/components/layout/navbar/Navbar";
// import { MoviesContainer } from "@/features/movies/containers/movies-container";
// import { getMovies } from "@/features/movies/api/getMovies";
// import { TMDBMovie } from "@/@types/movie.types";

import { HeroSection } from "@/features/home/components/HeroSection";
import { MediaRow } from "@/features/home/components/MediaRow";
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

export default async function HomePage() {
  const [trending, topRated, upcoming] = await Promise.all([
    getMovies({ category: "trending" }),
    getMovies({ category: "top_rated" }),
    getMovies({ category: "upcoming" }),
  ]);

  const heroMovie = trending?.results?.[0] || null;

  return (
    <main className="relative min-h-screen bg-black selection:bg-red-600/30">
      <HeroSection
        backdropPath={heroMovie?.backdrop_path ?? null}
        isLoading={!heroMovie}
      />

      {/* 
          Z-20 keeps this above the Hero image.
          -mt-20 on mobile and -mt-40 on desktop pulls rows up.
          Padding-bottom ensures the last row isn't cut off.
      */}
      <div className="relative z-20 -mt-5 pb-20 md:-mt-20 lg:-mt-20">
        <div className="space-y-2 md:space-y-6">
          <MediaRow
            title="Trending Now"
            items={trending?.results || []}
            href="/movies/category/trending"
          />
          <MediaRow
            title="Critics' Choice"
            items={topRated?.results || []}
            href="/movies/category/top-rated"
          />
          <MediaRow
            title="Anticipated Releases"
            items={upcoming?.results || []}
            href="/movies/category/upcoming"
          />
        </div>
      </div>

      {/* Premium Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-red-900/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-900/5 blur-[120px]" />
      </div>
    </main>
  );
}
