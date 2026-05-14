// app/movies/page.tsx

import { discoverMovies } from "@/features/discover/api/discoverMovies";
import { searchMovies } from "@/features/discover/api/searchMovies";
import { DiscoverHero } from "@/features/discover/components/DiscoverHero";
import { MovieEmptyState } from "@/features/discover/components/MovieEmptyState";
import { MovieGrid } from "@/features/discover/components/MovieGrid";
import { RegionFilter } from "@/features/discover/components/RegionFilter";
import { SortDropdown } from "@/features/discover/components/SortDropdown";
import { Pagination } from "@/shared/Pagination";
import { ResultCounter } from "@/shared/ResultCounter";

interface Props {
  searchParams: Promise<{
    // refactor
    // language?: string;
    with_original_language?: string;
    sort?: string;
    query?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams;

  // const language = params.language || "en";
  // refactor
  const withOriginalLanguage = params.with_original_language || "en";

  const sort = params.sort || "popularity.desc";

  const query = params.query || "";

  const page = Number(params.page || 1);

  // Dynamic Fetch
  // const movies = query
  //   ? await searchMovies(query, page)
  //   : await discoverMovies({
  //       language,
  //       sortBy: sort,
  //       page,
  //     });

  // refactor
  const movies = query
    ? await searchMovies(query, page)
    : await discoverMovies({
        withOriginalLanguage,
        sortBy: sort,
        page,
      });

  const hasResults = movies.results.length > 0;
  console.log("length", movies.length);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white ">
      <DiscoverHero movies={movies.results.slice(0, 5)} />

      <section className="relative z-30 mx-auto -mt-10 max-w-500 space-y-8 px-4 pb-20 md:px-8 lg:px-12">
        {/* Filter Bar */}
        <div className="flex flex-col gap-4 p-4 shadow-2xl md:flex-row md:items-center md:justify-between md:p-3">
          {/* Filters */}
          <div className="order-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center md:order-1 md:w-auto md:flex-1">
            <div className="w-full sm:w-auto">
              <RegionFilter />
            </div>

            <div className="mx-1 mb-1 hidden h-6 w-px bg-white/10 sm:block" />

            <div className="w-full sm:w-auto mt-1">
              <SortDropdown />
            </div>
          </div>

          {/* Result Counter */}
          <div className="order-1 shrink-0 md:order-2">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2 md:justify-end md:border-none md:bg-transparent md:px-0">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                <ResultCounter total={movies.total_results} /> Movies Found
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Title */}
        <div className="flex flex-col md:hidden">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            {query ? `Search: ${query}` : "Movies"}
          </h2>

          <p className="text-sm text-neutral-400">
            {movies.total_results.toLocaleString()} titles found
          </p>
        </div>

        {/* Desktop Title */}
        <div className="hidden md:block">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            {query ? `Search Results for "${query}"` : "Browse Movies"}
          </h2>
        </div>

        {/* Results */}
        {hasResults ? (
          <div className="space-y-10">
            <MovieGrid movies={movies.results} />

            <footer className="mt-10 border-t border-white/5 pt-8">
              <Pagination
                page={page}
                totalPages={movies.total_pages}
                language={withOriginalLanguage}
                query={query}
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
