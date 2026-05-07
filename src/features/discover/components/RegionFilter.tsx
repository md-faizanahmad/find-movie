"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const REGIONS = [
  { label: "All", value: "" }, // Added an 'All' option for better UX
  { label: "Hollywood", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Korean", value: "ko" },
  { label: "Japanese", value: "ja" },
  { label: "Spanish", value: "es" },
];

export function RegionFilter() {
  const searchParams = useSearchParams();

  // Get current values from URL
  const currentLang = searchParams.get("language") || "";
  const currentQuery = searchParams.get("query") || "";

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
      {REGIONS.map((region) => {
        const isActive = currentLang === region.value;

        // Build the new URL: keep the search query if it exists
        const params = new URLSearchParams();
        if (region.value) params.set("language", region.value);
        if (currentQuery) params.set("query", currentQuery);
        params.set("page", "1"); // Reset to page 1 on filter change

        return (
          <Link
            key={region.value}
            href={`/movies?${params.toString()}`}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
              isActive
                ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 scale-105"
                : "bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {region.label}
          </Link>
        );
      })}
    </div>
  );
}
