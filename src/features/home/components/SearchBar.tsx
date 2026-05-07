"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { TMDBSearchResult } from "@/@types/search.types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

        const data = await res.json();

        setResults(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      {/* Input */}
      <div className="relative">
        <Search
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-neutral-400"
          size={20}
        />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows, actors..."
          className="
            w-full rounded-2xl border border-white/10
            bg-neutral-900/80 py-4 pr-6 pl-12
            text-white placeholder:text-neutral-500
            backdrop-blur-xl outline-none
            transition-all
            focus:border-blue-500/50
            focus:ring-4 focus:ring-blue-500/20
          "
        />

        {loading && (
          <Loader2
            className="absolute top-1/2 right-4 -translate-y-1/2 animate-spin text-neutral-400"
            size={18}
          />
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div
          className="
            absolute top-full z-50 mt-3
            max-h-[70vh] w-full overflow-y-auto
            rounded-2xl border border-white/10
            bg-neutral-950/95 backdrop-blur-xl
            shadow-2xl
          "
        >
          {results.map((item) => {
            const title = item.title || item.name;

            const image = item.poster_path || item.profile_path;

            const href =
              item.media_type === "movie"
                ? `/movie/${item.id}`
                : item.media_type === "tv"
                  ? `/tv/${item.id}`
                  : `/person/${item.id}`;

            return (
              <Link
                key={`${item.media_type}-${item.id}`}
                href={href}
                className="
                  flex items-center gap-4
                  border-b border-white/5
                  p-4 transition-colors
                  hover:bg-white/5
                "
              >
                <div className="relative h-20 w-14 overflow-hidden rounded-lg bg-neutral-800">
                  {image ? (
                    <Image
                      src={`${IMAGE_BASE_URL}${image}`}
                      alt={title || "media"}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white">{title}</h3>

                  <p className="mt-1 text-sm capitalize text-neutral-400">
                    {item.media_type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
