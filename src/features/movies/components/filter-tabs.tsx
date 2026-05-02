"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const filters = ["Trending", "Top Rated", "Upcoming", "Genre", "Latest"];

export function FilterTabs() {
  const [active, setActive] = useState("Trending");

  return (
    <div className="w-full border-b border-gray-100 bg-white">
      {/* Scrollable container for mobile, centered for desktop */}
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
          {filters.map((filter) => {
            const isActive = active === filter;
            return (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className="relative py-4 text-sm font-medium transition-all duration-200 whitespace-nowrap outline-none group"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-black"
                      : "text-gray-400 group-hover:text-gray-600",
                  )}
                >
                  {filter}
                </span>

                {/* Animated Indicator */}
                {isActive ? (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gray-200 transition-colors" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
