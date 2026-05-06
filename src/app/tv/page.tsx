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

  const tvShows = await discoverTVShows({
    language,
    sortBy: sort,
    page,
  });

  const hasResults = tvShows.results.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <TVHero shows={tvShows.results.slice(0, 5)} />

      <section className="relative z-20 -mt-20 space-y-6 px-4 pb-20 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TVRegionFilter />

          <TVSortDropdown />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">TV Shows</h2>

            <p className="text-sm text-neutral-400">
              {tvShows.total_results.toLocaleString()} titles found
            </p>
          </div>
        </div>

        {hasResults ? (
          <>
            <TVGrid shows={tvShows.results} />

            <TVPagination
              currentPage={tvShows.page}
              totalPages={tvShows.total_pages}
              language={language}
            />
          </>
        ) : (
          <TVEmptyState />
        )}
      </section>
    </main>
  );
}
