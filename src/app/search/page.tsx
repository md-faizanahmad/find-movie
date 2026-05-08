import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SearchGrid } from "@/features/search/components/SearchGrid";
import { searchMulti } from "@/features/search/services/search.service";
import { SearchBar } from "@/features/home/components/SearchBar";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const results = query ? await searchMulti(query) : [];

  return (
    <main className="min-h-screen bg-black px-4 pt-16 pb-20 md:pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 md:mb-12">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>

          {/* SearchBar - Ensuring it takes full width on mobile */}
          <div className="w-full">
            <SearchBar />
          </div>

          {query ? (
            <div className="space-y-1">
              <h1 className="text-2xl font-black uppercase tracking-tighter text-white md:text-5xl">
                Search Results
              </h1>
              <p className="text-sm text-neutral-400 md:text-lg">
                Showing results for
                <span className="ml-2 font-bold text-red-500 uppercase">
                  &quot;{query}&quot;
                </span>
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <h1 className="text-2xl font-black uppercase tracking-tighter text-white md:text-5xl">
                Search
              </h1>
              <p className="text-sm text-neutral-400 md:text-lg">
                Search for movies, TV shows, and actors.
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="relative z-10">
          <SearchGrid results={results} query={query} />
        </div>
      </div>
    </main>
  );
}
