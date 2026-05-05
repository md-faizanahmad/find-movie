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

  const heroMovie = trending.results[0];

  return (
    <main className="bg-black min-h-screen">
      <HeroSection backdropPath={heroMovie?.backdrop_path ?? null} />

      <MediaRow title="Trending" items={trending.results} />
      <MediaRow title="Top Rated" items={topRated.results} />
      <MediaRow title="Upcoming" items={upcoming.results} />
    </main>
  );
}
