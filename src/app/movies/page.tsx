import { discoverMovies } from "@/features/discover/api/discoverMovies";

import { DiscoverHero } from "@/features/discover/components/DiscoverHero";
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

  const movies = await discoverMovies({
    language,
    sortBy: sort,
    page,
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <DiscoverHero movies={movies.results.slice(0, 5)} />

      <section className="relative z-20 -mt-20 space-y-6 px-4 pb-20 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <RegionFilter />

          <SortDropdown />
        </div>

        <MovieGrid movies={movies.results} />
        <div className="flex justify-center gap-4 pt-10">
          {/* Improved Pagination Section */}
          <footer className="border-t border-white/5 mt-10">
            <Pagination
              page={page}
              totalPages={movies.total_pages}
              language={language}
            />
          </footer>
        </div>
      </section>
    </main>
  );
}
