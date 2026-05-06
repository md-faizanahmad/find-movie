import { discoverMovies } from "@/features/discover/api/discoverMovies";
import { DiscoverHero } from "@/features/discover/components/DiscoverHero";
import { MovieEmptyState } from "@/features/discover/components/MovieEmptyState";
import { MovieGrid } from "@/features/discover/components/MovieGrid";
import { RegionFilter } from "@/features/discover/components/RegionFilter";
import { SortDropdown } from "@/features/discover/components/SortDropdown";
import { Pagination } from "@/shared/Pagination";

interface Props {
  searchParams: Promise<{
    language?: string;
    sort?: string;
    query?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = params.language || "en";
  const sort = params.sort || "popularity.desc";
  const page = Number(params.page || 1);

  const movies = await discoverMovies({ language, sortBy: sort, page });
  const hasResults = movies.results.length > 0;

  return (
    // overflow-x-hidden prevents the horizontal "shaking" on mobile swipe
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <DiscoverHero movies={movies.results.slice(0, 5)} />

      {/* 
          1. -mt-16 provides enough space so the filters don't cover the Hero search bar.
          2. z-30 ensures dropdown menus appear above the movie cards.
      */}
      <section className="relative z-30 -mt-16 space-y-8 px-4 pb-20 md:px-8 lg:px-12 max-w-500 mx-auto">
        {/* Unified Filter/Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <RegionFilter />
            {/* Divider for desktop */}
            <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" />
            <SortDropdown />
          </div>

          <div className="hidden md:block">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {movies.total_results.toLocaleString()} Movies
            </p>
          </div>
        </div>

        {/* Results Info - Mobile optimized alignment */}
        <div className="flex flex-col md:hidden">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            Movies
          </h2>
          <p className="text-sm text-neutral-400">
            {movies.total_results.toLocaleString()} titles found
          </p>
        </div>

        {/* Desktop Title (Hidden on mobile to save space) */}
        <div className="hidden md:block">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Browse Movies
          </h2>
        </div>

        {/* Grid / Empty State */}
        {hasResults ? (
          <div className="space-y-10">
            <MovieGrid movies={movies.results} />

            <footer className="mt-10 border-t border-white/5 pt-8">
              <Pagination
                page={page}
                totalPages={movies.total_pages}
                language={language}
              />
            </footer>
          </div>
        ) : (
          <MovieEmptyState />
        )}
      </section>
    </main>
  );
}
