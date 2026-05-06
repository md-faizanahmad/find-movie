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
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <TVHero shows={tvShows.results.slice(0, 5)} />

      {/* Main Content Container */}
      <section className="relative z-20 -mt-24 space-y-10 px-4 pb-20 md:px-8 lg:px-16 max-w-450 mx-auto">
        {/* Discovery Header */}
        <header className="flex flex-col gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Title & Badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                  TV Series
                </h2>
                <span className="bg-blue-600 px-2 py-0.5 text-[10px] md:text-xs font-bold rounded uppercase tracking-widest">
                  Series
                </span>
              </div>
              <p className="text-neutral-400 text-sm md:text-base font-medium flex items-center gap-2">
                <span>{tvShows.total_results.toLocaleString()}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
                <span className="text-neutral-500 font-normal">
                  Episodes & Seasons
                </span>
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center gap-2 bg-neutral-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md shadow-xl">
              <TVRegionFilter />
              <div className="w-px h-5 bg-white/10 mx-1" />
              <TVSortDropdown />
            </div>
          </div>
        </header>

        {/* Results Logic */}
        {hasResults ? (
          <div className="space-y-16">
            <TVGrid shows={tvShows.results} />

            <footer className="border-t border-white/5 pt-12">
              <TVPagination
                currentPage={tvShows.page}
                totalPages={tvShows.total_pages}
                language={language}
              />
            </footer>
          </div>
        ) : (
          <TVEmptyState />
        )}
      </section>
    </main>
  );
}
