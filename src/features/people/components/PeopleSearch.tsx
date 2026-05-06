"use client";

import { useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

export function PeopleSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    params.delete("page");

    startTransition(() => {
      router.push(`/people?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search actors, actresses, celebrities..."
        className="w-full bg-transparent px-5 py-4 text-white outline-none placeholder:text-neutral-400"
      />

      <button
        onClick={handleSearch}
        disabled={isPending}
        className="px-5 text-white"
      >
        <Search />
      </button>
    </div>
  );
}
