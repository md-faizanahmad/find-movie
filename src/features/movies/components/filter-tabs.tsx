"use client";

import { MovieCategory } from "@/@types/movie-category.types";
import { cn } from "@/lib/utils/cn";

const filters: { label: string; value: MovieCategory }[] = [
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Latest", value: "latest" },
];

interface FilterTabsProps {
  active: MovieCategory;
  onChange: (value: MovieCategory) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="w-full border-b border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
          {filters.map((filter) => {
            const isActive = active === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className="relative py-4 text-sm font-medium whitespace-nowrap group"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-white"
                      : "text-text-secondary group-hover:text-white",
                  )}
                >
                  {filter.label}
                </span>

                {/* Active Indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all",
                    isActive
                      ? "bg-brand-primary"
                      : "bg-transparent group-hover:bg-zinc-700",
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
