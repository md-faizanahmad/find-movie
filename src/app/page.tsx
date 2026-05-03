import { Navbar } from "@/components/layout/navbar/Navbar";
import { MoviesContainer } from "@/features/movies/containers/movies-container";

async function getInitialMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?category=trending`,
    { cache: "no-store" },
  );

  const data = await res.json();
  return data.data.results ?? [];
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
