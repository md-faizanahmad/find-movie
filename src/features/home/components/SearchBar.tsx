"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
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
          bg-neutral-900/80 py-4 pr-6 pl-12
          text-white placeholder:text-neutral-500
          outline-none
          focus:border-red-500/40
        "
      />
    </form>
  );
}
