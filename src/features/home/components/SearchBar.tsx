"use client";

import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { SearchResult } from "@/features/search/services/search.service";
import { SearchResults } from "@/features/search/components/SearchResults";
import { SearchEmpty } from "@/features/search/components/SearchEmpty";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchResult[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(async () => {
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

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search
          className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
          size={20}
        />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows, actors..."
          className="
            w-full rounded-2xl border border-white/10
            bg-neutral-900/80 py-4 pr-12 pl-12
            text-white placeholder:text-neutral-500
            outline-none
            focus:border-blue-500/50
          "
        />

        {loading && (
          <Loader2
            className="absolute top-1/2 right-4 -translate-y-1/2 animate-spin text-neutral-400"
            size={18}
          />
        )}
      </div>

      {query.trim() &&
        (results.length > 0 ? (
          <SearchResults results={results} />
        ) : !loading ? (
          <SearchEmpty query={query} />
        ) : null)}
    </div>
  );
}
