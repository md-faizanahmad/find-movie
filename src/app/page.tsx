// import { Navbar } from "@/components/layout/navbar/Navbar";
// import { MoviesContainer } from "@/features/movies/containers/movies-container";
// import { getMovies } from "@/features/movies/api/getMovies";
// import { TMDBMovie } from "@/@types/movie.types";

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
// app/page.tsx

import { HeroSection } from "@/features/home/components/HeroSection";
import { MediaRow } from "@/features/home/components/MediaRow";
import { fetchFromAPI } from "@/lib/tmdb";

export default async function HomePage() {
  const trendingMovies = await fetchFromAPI("/trending/movie/week");
  const popularMovies = await fetchFromAPI("/movie/popular");
  const trendingTV = await fetchFromAPI("/trending/tv/week");

  const heroMovie = trendingMovies.results[0];

  return (
    <main className="bg-black min-h-screen">
      <HeroSection backdropPath={heroMovie?.backdrop_path} />

      <MediaRow title="Trending Movies" items={trendingMovies.results} />
      <MediaRow title="Popular Movies" items={popularMovies.results} />
      <MediaRow title="Trending TV Shows" items={trendingTV.results} />
    </main>
  );
}
