"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useTransition } from "react";

const SORT_OPTIONS = [
  {
    label: "Trending",
    value: "popularity.desc",
  },

  {
    label: "Top Rated",
    value: "vote_average.desc",
  },

  {
    label: "Latest Releases",
    value: "primary_release_date.desc",
  },
];

export function SortDropdown() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") || "popularity.desc";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    // Reset page when sorting changes
    params.delete("page");

    startTransition(() => {
      router.push(`/movies?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full sm:w-auto">
      <select
        value={currentSort}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className="
          w-full
          appearance-none
          rounded-xl
          border
          border-white/10
          bg-neutral-900

          px-4
          py-3
          pr-10

          text-sm
          font-medium
          text-white

          outline-none
          transition-all

          hover:border-white/20
          focus:border-red-600
        "
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
