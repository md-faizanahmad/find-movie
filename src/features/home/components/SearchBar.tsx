"use client";

import { Search } from "lucide-react"; // Using lucide-react for a premium thin-stroke icon

export function SearchBar() {
  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={(e) => e.preventDefault()}
      className="group relative w-full max-w-2xl"
    >
      <div className="relative flex items-center">
        {/* Search Icon - Positioned Absolutely */}
        <div className="absolute left-4 z-20 text-neutral-400 transition-colors group-focus-within:text-blue-500">
          <Search size={20} strokeWidth={2.5} />
        </div>

        {/* The Input Field */}
        <input
          type="search"
          name="q"
          id="search-input"
          placeholder="Search movies, TV shows, actors..."
          aria-label="Search movies and TV shows"
          aria-required="false"
          className="
            w-full rounded-xl border border-white/10 
            bg-neutral-900/60 py-4 pr-6 pl-12 
            text-base font-medium text-white 
            placeholder-neutral-500 backdrop-blur-md 
            transition-all duration-300
            
            /* Focus State - Prime/Netflix Inspired */
            focus:border-blue-500/50 focus:bg-neutral-900/80 focus:ring-4 focus:ring-blue-500/20 focus:outline-none
            
            /* Responsive Sizing */
            md:py-5 md:text-lg
            
            /* Mobile Optimization */
            appearance-none
          "
        />

        {/* Keyboard Shortcut Indicator (Desktop Only) */}
        <div className="absolute right-4 hidden items-center space-x-1 md:flex">
          <kbd className="flex h-6 items-center rounded border border-neutral-700 bg-neutral-800 px-1.5 font-sans text-[10px] font-medium text-neutral-400">
            ⌘
          </kbd>
          <kbd className="flex h-6 items-center rounded border border-neutral-700 bg-neutral-800 px-1.5 font-sans text-[10px] font-medium text-neutral-400">
            K
          </kbd>
        </div>
      </div>

      {/* Hidden Submit for Screen Readers */}
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
}
