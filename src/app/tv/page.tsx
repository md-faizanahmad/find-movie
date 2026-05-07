// app/tv-shows/page.tsx

import { discoverTVShows } from "@/features/tv/api/discoverTVShows";

import { searchTVShows } from "@/features/tv/api/searchTVShows";

import { TVGrid } from "@/features/tv/components/TVGrid";

import { TVPagination } from "@/features/tv/components/TVPagination";

import { TVEmptyState } from "@/features/tv/components/TVEmptyState";

import { TVHero } from "@/features/tv/components/TVHero";

import { TVRegionFilter } from "@/features/tv/components/TVRegionFilter";

import { TVSortDropdown } from "@/features/tv/components/TVSortDropdown";

import { ResultCounter } from "@/shared/ResultCounter";

interface Props {
  searchParams: Promise<{
    language?: string;

    sort?: string;

    query?: string;

    page?: string;
  }>;
}

export default async function TVShowsPage({ searchParams }: Props) {
  const params = await searchParams;

  const language = params.language || "en";

  const sort = params.sort || "popularity.desc";

  const query = params.query || "";

  const page = Number(params.page || 1);

  // Dynamic Fetch
  const tvShows = query
    ? await searchTVShows(query, page)
    : await discoverTVShows({
        language,
        sortBy: sort,
        page,
      });

  const hasResults = tvShows.results.length > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <TVHero shows={tvShows.results.slice(0, 5)} />

      <section className="relative z-30 mx-auto -mt-8 max-w-500 space-y-8 px-4 pb-20 md:px-8 lg:px-12">
        {/* Filter Bar */}
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-white/5 shadow-2xl md:flex-row md:items-center md:justify-between md:p-3">
          {/* 1. Filter Group: Stacks on mobile, inline on desktop */}
          <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center md:w-auto md:flex-1 order-1">
            {/* Region Filter - Priority 1 */}
            <div className="w-full sm:w-auto">
              <TVRegionFilter />
            </div>

            {/* Vertical Divider: Hidden on mobile stack */}
            <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" />

            {/* Sort Dropdown - Priority 2 */}
            <div className="w-full sm:w-auto">
              <TVSortDropdown />
            </div>
          </div>

          {/* 2. Results Count: Status bar at bottom on mobile, side on desktop */}
          <div className="shrink-0 order-2 md:order-2">
            <div className="flex items-center justify-center md:justify-end gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 md:bg-transparent md:border-none md:px-0">
              {/* Animated blue pulse for TV */}
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                <ResultCounter total={tvShows.total_results} /> Series Found
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden">
          <h2 className="text-xl font-bold italic uppercase tracking-tighter">
            {query ? `Search: ${query}` : "TV Series"}
          </h2>

          <p className="text-sm text-neutral-400">
            {tvShows.total_results.toLocaleString()} titles found
          </p>
        </div>

        {/* Desktop Title */}
        <div className="hidden md:block">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            {query ? `Search Results for "${query}"` : "Browse TV Shows"}
          </h2>
        </div>

        {/* Results */}
        {hasResults ? (
          <div className="space-y-10">
            <TVGrid shows={tvShows.results} />

            <div className="border-t border-white/5 pt-6">
              <TVPagination
                currentPage={tvShows.page}
                totalPages={tvShows.total_pages}
                language={language}
                query={query}
              />
            </div>
          </div>
        ) : (
          <TVEmptyState />
        )}
      </section>
    </main>
  );
}
