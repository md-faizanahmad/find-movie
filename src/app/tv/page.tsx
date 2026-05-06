import { discoverTVShows } from "@/features/tv/api/discoverTVShows";
import { TVGrid } from "@/features/tv/components/TVGrid";
import { TVPagination } from "@/features/tv/components/TVPagination";
import { TVEmptyState } from "@/features/tv/components/TVEmptyState";
import { TVHero } from "@/features/tv/components/TVHero";
import { TVRegionFilter } from "@/features/tv/components/TVRegionFilter";
import { TVSortDropdown } from "@/features/tv/components/TVSortDropdown";

interface Props {
  searchParams: Promise<{
    language?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function TVShowsPage({ searchParams }: Props) {
  const params = await searchParams;
  const language = params.language || "en";
  const sort = params.sort || "popularity.desc";
  const page = Number(params.page || 1);

  const tvShows = await discoverTVShows({ language, sortBy: sort, page });
  const hasResults = tvShows.results.length > 0;

  return (
    // Fixed overflow-x-hidden to prevent horizontal scroll on mobile
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <TVHero shows={tvShows.results.slice(0, 5)} />

      {/* 
          1. Increased margin-top slightly to -mt-16 to avoid search bar overlap 
          2. Added z-index to ensure dropdowns float correctly
      */}
      <section className="relative z-30 -mt-12 space-y-8 px-4 pb-20 md:px-8 lg:px-12 max-w-500 mx-auto">
        {/* Align Filter and Sorting in a better row */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <TVRegionFilter />
            {/* Divider hidden on very small screens if needed */}
            <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
            <TVSortDropdown />
          </div>

          <div className="hidden md:block text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {tvShows.total_results.toLocaleString()} Results
            </p>
          </div>
        </div>

        {/* Mobile-only results text - fixed text-black to text-neutral-400 */}
        <div className="md:hidden">
          <h2 className="text-xl font-bold italic uppercase tracking-tighter">
            TV Series
          </h2>
          <p className="text-sm text-neutral-400">
            {tvShows.total_results.toLocaleString()} titles found
          </p>
        </div>

        {/* Results Logic */}
        {hasResults ? (
          <div className="space-y-10">
            <TVGrid shows={tvShows.results} />

            <div className="pt-6 border-t border-white/5">
              <TVPagination
                currentPage={tvShows.page}
                totalPages={tvShows.total_pages}
                language={language}
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
