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
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <DiscoverHero movies={movies.results.slice(0, 5)} />

      {/* Main Content Wrap */}
      <section className="relative z-20 -mt-24 space-y-10 px-4 pb-20 md:px-8 lg:px-16 max-w-[1800px] mx-auto">
        {/* Discovery Header (Results Info + Filters) */}
        <header className="flex flex-col gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Title & Badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                  Explore
                </h2>
                <span className="bg-red-600 px-2 py-0.5 text-[10px] md:text-xs font-bold rounded uppercase tracking-widest">
                  Live
                </span>
              </div>
              <p className="text-neutral-400 text-sm md:text-base font-medium flex items-center gap-2">
                <span>{movies.total_results.toLocaleString()}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span className="text-neutral-500">Global Titles</span>
              </p>
            </div>

            {/* Desktop Filters Group */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-neutral-900/50 p-1 rounded-xl border border-white/5 shadow-inner">
                <RegionFilter />
                <div className="w-px h-4 bg-white/10" />
                <SortDropdown />
              </div>
            </div>
          </div>
        </header>

        {/* Results Body */}
        {hasResults ? (
          <div className="space-y-12">
            <MovieGrid movies={movies.results} />

            <footer className="border-t border-white/5 pt-10">
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
