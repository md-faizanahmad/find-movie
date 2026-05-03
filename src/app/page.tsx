import { Movie } from "@/@types/movie.types";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { SearchBar } from "@/components/search-bar";
import { FilterTabs } from "@/features/movies/components/filter-tabs";
import { MovieCard } from "@/features/movies/components/movie-card";
import MovieCardSkeleton from "@/shared/skeleton/movie-card-skeleton";

async function getMovies() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/trending`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch");

    return res.json();
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return null;
  }
}

export default async function HomePage() {
  const response = await getMovies();
  const movies: Movie[] = response?.data?.results ?? [];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar />
          <FilterTabs />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.length > 0
            ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            : Array.from({ length: 12 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
        </div>
      </main>
    </>
  );
}
