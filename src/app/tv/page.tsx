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
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4 p-3 shadow-2xl md:p-4">
          {/* Filters */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <TVRegionFilter />

            <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />

            <TVSortDropdown />
          </div>

          {/* Results */}
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              <ResultCounter total={tvShows.total_results} /> Results
            </p>
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
