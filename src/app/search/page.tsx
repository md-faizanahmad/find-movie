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

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;

  const query = params.q || "";

  const results = query ? await searchMulti(query) : [];

  const heroImage = results.find(
    (item) =>
      item.image && (item.media_type === "movie" || item.media_type === "tv"),
  )?.image;

  const heroImageUrl = heroImage ? `${IMAGE_BASE_URL}${heroImage}` : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Background */}
      {heroImageUrl && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Blur Layer */}
          <div className="absolute inset-0 backdrop-blur-sm" />

          {/* Gradient Fade */}
          <div
            className="
              absolute inset-0
              bg-linear-to-b
              from-black/60
              via-black/70
              to-black
            "
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-4 pt-14 pb-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-6 md:mb-14">
            <Link
              href="/"
              className="
                inline-flex w-fit items-center gap-2
                text-sm font-medium text-neutral-400
                transition-colors hover:text-white
              "
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>

            {/* Search */}
            <div className="w-full">
              <SearchBar />
            </div>

            {/* Hero Content */}
            {query ? (
              <div className="space-y-3">
                <p
                  className="
                    text-xs font-bold tracking-[0.35em]
                    text-red-500 uppercase
                  "
                >
                  Search Experience
                </p>

                <h1
                  className="
                    max-w-5xl text-4xl font-black
                    tracking-tighter text-white
                    md:text-7xl
                  "
                >
                  {query}
                </h1>

                <p className="max-w-2xl text-sm text-neutral-300 md:text-lg">
                  Found {results.length} results across movies, TV shows, and
                  actors.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p
                  className="
                    text-xs font-bold tracking-[0.35em]
                    text-red-500 uppercase
                  "
                >
                  Explore Content
                </p>

                <h1
                  className="
                    text-4xl font-black tracking-tighter
                    text-white md:text-7xl
                  "
                >
                  Search
                </h1>

                <p className="max-w-2xl text-sm text-neutral-400 md:text-lg">
                  Search for movies, TV shows, and actors.
                </p>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="relative z-10">
            <SearchGrid results={results} query={query} />
          </div>
        </div>
      </div>
    </main>
  );
}
