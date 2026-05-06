"use client";

import { Search } from "lucide-react";

export function DiscoverSearch() {
  return (
    <div className="flex items-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
      <input
        type="text"
        placeholder="Search movies, actors, genres..."
        className="w-full bg-transparent px-5 py-4 text-white outline-none placeholder:text-neutral-400"
      />

      <button className="px-5 text-white">
        <Search />
      </button>
    </div>
  );
}
