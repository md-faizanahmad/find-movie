"use client";

import { useState, useEffect } from "react";
import { Search, X, Command } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Clear search handler
  const handleClear = () => setQuery("");

  return (
    <div className="w-full max-w-xl px-4">
      <div
        className={cn(
          "relative flex items-center w-full transition-all duration-300 ease-in-out",
          "bg-gray-50/50 backdrop-blur-sm border rounded-2xl",
          isFocused
            ? "bg-white border-blue-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] scale-[1.01]"
            : "border-gray-100 shadow-sm",
        )}
      >
        {/* Search Icon */}
        <div className="pl-4">
          <Search
            className={cn(
              "w-5 h-5 transition-colors",
              isFocused ? "text-blue-500" : "text-gray-400",
            )}
          />
        </div>

        {/* Input Field */}
        <input
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, actors, or directors..."
          className="w-full bg-transparent px-3 py-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />

        {/* Right Actions: Clear or Command Hint */}
        <div className="pr-4 flex items-center gap-2">
          {query.length > 0 ? (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Command className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400">K</span>
            </div>
          )}
        </div>
      </div>

      {/* Optional: Dropdown Result Hint */}
      {isFocused && query.length > 0 && (
        <div className="absolute mt-2 w-[calc(100%-2rem)] max-w-xl bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
          <p className="text-[11px] font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">
            Quick Results
          </p>
          <div className="h-20 flex items-center justify-center text-sm text-gray-400 italic">
            Searching for &quot;{query}&quot;...
          </div>
        </div>
      )}
    </div>
  );
}
