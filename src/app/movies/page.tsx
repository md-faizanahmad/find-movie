// import { discoverMovies } from "@/features/discover/api/discoverMovies";

// import { DiscoverHero } from "@/features/discover/components/DiscoverHero";
// import { MovieGrid } from "@/features/discover/components/MovieGrid";
// import { RegionFilter } from "@/features/discover/components/RegionFilter";
// import { SortDropdown } from "@/features/discover/components/SortDropdown";
// import Link from "next/link";

// interface Props {
//   searchParams: Promise<{
//     language?: string;
//     sort?: string;
//     query?: string;
//     page?: string;
//   }>;
// }

// export default async function MoviesPage({ searchParams }: Props) {
//   const params = await searchParams;

//   const language = params.language || "en";
//   const sort = params.sort || "popularity.desc";
//   const page = Number(params.page || 1);

//   const movies = await discoverMovies({
//     language,
//     sortBy: sort,
//     page,
//   });

//   return (
//     <main className="min-h-screen bg-black text-white">
//       <DiscoverHero movies={movies.results.slice(0, 5)} />

//       <section className="relative z-20 -mt-20 space-y-6 px-4 pb-20 md:px-8 lg:px-12">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <RegionFilter />

//           <SortDropdown />
//         </div>

//         <MovieGrid movies={movies.results} />
//         <div className="flex justify-center gap-4 pt-10">
//           {page > 1 && (
//             <Link
//               href={`/movies?language=${language}&page=${page - 1}`}
//               className="rounded-xl bg-neutral-900 px-5 py-3"
//             >
//               Previous
//             </Link>
//           )}

//           {page < movies.total_pages && (
//             <Link
//               href={`/movies?language=${language}&page=${page + 1}`}
//               className="rounded-xl bg-red-600 px-5 py-3"
//             >
//               Next
//             </Link>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

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

  // Defaults
  const language = params.language || "en";
  const sort = params.sort || "popularity.desc";
  const page = Number(params.page || 1);

  // Fetch Data
  const movies = await discoverMovies({
    language,
    sortBy: sort,
    page,
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* Hero Section - Top 5 Trending */}
      <DiscoverHero movies={movies.results.slice(0, 5)} />

      {/* Main Content Grid */}
      <section className="relative z-20 -mt-32 space-y-8 px-4 pb-20 md:px-8 lg:px-16 max-w-500 mx-auto">
        {/* Toolbar: Filters & Sorting */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Browse Movies</h2>
            <p className="text-neutral-400 text-sm">
              Discover your next favorite story
            </p>
          </div>

          <div className="flex items-center gap-4">
            <RegionFilter />
            <SortDropdown />
          </div>
        </header>

        {/* Movies Display */}
        <MovieGrid movies={movies.results} />

        {/* Improved Pagination Section */}
        <footer className="border-t border-white/5 mt-10">
          <Pagination
            page={page}
            totalPages={movies.total_pages}
            language={language}
          />
        </footer>
      </section>
    </main>
  );
}
