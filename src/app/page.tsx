import Navbar from "@/components/layout/navbar/Navbar";
import { SearchBar } from "@/components/search-bar";
import { FilterTabs } from "@/features/movies/components/filter-tabs";
import MovieCardSkeleton from "@/shared/skeleton/movie-card-skeleton";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar />
          <FilterTabs />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
