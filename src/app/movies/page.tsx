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
      <section className="relative z-30 -mt-12 space-y-8 px-4 pb-20 md:px-8 lg:px-12 max-w-500 mx-auto">
        {/* Unified Filter/Sort Bar */}
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-white/5 shadow-2xl md:flex-row md:items-center md:justify-between md:p-3">
          {/* Filter Group: Stacks on mobile, inline on desktop */}
          <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center md:w-auto md:flex-1">
            {/* Region Filter - Priority 1 */}
            <div className="w-full sm:w-auto">
              <RegionFilter />
            </div>

            {/* Vertical Divider: Hidden on mobile stack, shown on horizontal layout */}
            <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" />

            {/* Sort Dropdown - Priority 2 */}
            <div className="w-full sm:w-auto">
              <SortDropdown />
            </div>
          </div>

          {/* Results Count: Hidden on small mobile, shown from md up */}
          <div className="hidden md:block shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                {movies.total_results.toLocaleString()} Movies
              </p>
            </div>
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
