import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SearchGrid } from "@/features/search/components/SearchGrid";

import { searchMulti } from "@/features/search/services/search.service";
import { SearchBar } from "@/components/search-bar";

interface Props {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || "";

  const results = query ? await searchMulti(query) : [];

  return (
    <main className="min-h-screen bg-black px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6">
          <Link
            href="/"
            className="
              inline-flex w-fit items-center gap-2
              text-sm font-medium text-neutral-400
              transition-colors hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <SearchBar />

          {query ? (
            <div>
              <h1 className="text-3xl font-bold text-white">Search Results</h1>

              <p className="mt-2 text-neutral-400">
                Showing results for
                <span className="ml-2 font-medium text-white">
                  &quot;{query}&quot;
                </span>
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-white">Search</h1>

              <p className="mt-2 text-neutral-400">
                Search for movies, TV shows, and actors.
              </p>
            </div>
          )}
        </div>

        <SearchGrid results={results} query={query} />
      </div>
    </main>
  );
}
