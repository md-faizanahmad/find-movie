"use client";

import { Search, Home, TrendingUp, Star, Calendar, Film } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export function Navbar() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Trending", icon: TrendingUp },
    { name: "Top Rated", icon: Star },
    { name: "Upcoming", icon: Calendar },
  ];

  return (
    <>
      {/* TOP BAR: Logo & Search (Always Top) */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-fit">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Film className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-gray-900 hidden sm:block">
              FIND<span className="text-blue-600">MOVIE</span>
            </h1>
          </div>

          {/* Search Bar - Responsive width */}
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all outline-none"
            />
          </div>

          {/* Desktop Only Nav Links */}
          {/* <nav className="hidden md:flex items-center gap-8 ml-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  active === item.name ? "text-black" : "text-gray-400",
                )}
              >
                {item.name}
              </button>
            ))}
          </nav> */}
        </div>
      </header>

      {/* BOTTOM BAR: Instagram-style Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-6 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="flex flex-col items-center gap-1 group"
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all",
                    isActive
                      ? "text-black scale-110"
                      : "text-gray-400 group-active:scale-90",
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-black" : "text-gray-400",
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for Mobile to prevent content being hidden behind bottom nav */}
      <div className="h-20 md:hidden" />
    </>
  );
}
