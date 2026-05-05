import { Navbar } from "@/components/layout/navbar/Navbar";
import { MoviesContainer } from "@/features/movies/containers/movies-container";
import { getMovies } from "@/features/movies/api/getMovies";
import { TMDBMovie } from "@/@types/movie.types";

async function getInitialMovies(): Promise<TMDBMovie[]> {
  const data = await getMovies({ category: "trending" });
  return data.results ?? [];
}

export default async function HomePage() {
  const movies = await getInitialMovies();

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <MoviesContainer initialMovies={movies} />
      </main>
    </>
  );
}
