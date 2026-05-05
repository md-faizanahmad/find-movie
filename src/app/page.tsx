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
  // Fetch data in parallel for maximum performance
  const [trending, topRated, upcoming] = await Promise.all([
    getMovies({ category: "trending" }),
    getMovies({ category: "top_rated" }),
    getMovies({ category: "upcoming" }),
  ]);

  // Use the first trending movie for the Hero, but fallback gracefully
  const heroMovie = trending?.results?.[0] || null;

  return (
    <main className="relative min-h-screen bg-black pb-20 selection:bg-blue-500/30">
      {/* 
          Hero Section: 
          We pass the loading state if we were using a client-side fetch, 
          but for Server Components, we wrap the whole block in Suspense if needed.
      */}
      <HeroSection
        backdropPath={heroMovie?.backdrop_path ?? null}
        isLoading={!heroMovie}
      />

      {/* 
          Content Wrapper: 
          The negative margin-top (-mt-24) pulls the rows over the hero gradient 
          for a modern, layered cinematic feel.
      */}
      <div className="relative z-20 -mt-8 space-y-4 md:-mt-32 md:space-y-8 lg:-mt-48">
        <MediaRow
          title="Trending Now"
          items={trending?.results || []}
          href="/movies/category/trending"
        />

        {/* Subtle separator or background glow could be added here */}

        <MediaRow
          title="Critics' Choice"
          items={topRated?.results || []}
          href="/movies/category/top-rated"
        />

        <div className="pt-4">
          <MediaRow
            title="Anticipated Releases"
            items={upcoming?.results || []}
            href="/movies/category/upcoming"
          />
        </div>
      </div>

      {/* Background Ambient Glow (Optional - Premium Touch) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[30%] w-[30%] rounded-full bg-indigo-900/5 blur-[100px]" />
      </div>
    </main>
  );
}
