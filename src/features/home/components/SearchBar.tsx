"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(currentQuery);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl">
      <Search
        className="
          absolute top-1/2 left-4
          -translate-y-1/2 text-neutral-400
        "
        size={20}
      />

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, TV shows, actors..."
        className="
          h-14 w-full rounded-2xl
          border border-white/10
          bg-neutral-900/70
          py-4 pr-6 pl-12
          text-white placeholder:text-neutral-500
          outline-none backdrop-blur-md
          transition-all duration-300
          focus:border-red-500/40
          focus:bg-neutral-900/90
        "
      />
    </form>
  );
}
