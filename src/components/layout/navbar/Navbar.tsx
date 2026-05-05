"use client";

import { Home, Film, Tv, Users, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Movies", icon: Film, href: "/movies" },
    { name: "TV Shows", icon: Tv, href: "/tv" },
    { name: "Actors", icon: Users, href: "/actors" },
  ];

  return (
    <>
      {/* TOP BAR: Logo & Desktop Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 transition-transform group-hover:scale-110">
                <Clapperboard className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white">
                FIND<span className="text-red-600">MOVIE</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className={cn(
                  "relative text-sm font-bold uppercase tracking-widest transition-all hover:text-white",
                  active === item.name ? "text-white" : "text-neutral-500",
                )}
              >
                {item.name}
                {active === item.name && (
                  <span className="absolute -bottom-5.5 left-0 h-0.5 w-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Profile Placeholder (Adds balance to UI) */}
          <div className="hidden md:block h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700" />
        </div>
      </header>

      {/* BOTTOM BAR: Mobile Navigation (Instagram-style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/80 px-8 py-4 backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={cn(
                    "p-1 transition-all duration-300",
                    isActive ? "text-red-600" : "text-neutral-500",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-transform",
                      isActive ? "scale-110" : "group-active:scale-90",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-tighter transition-colors",
                    isActive ? "text-white" : "text-neutral-600",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for Mobile (so content isn't hidden behind bottom nav) */}
      <div className="h-20 md:hidden" />
    </>
  );
}
