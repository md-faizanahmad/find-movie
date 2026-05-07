"use client";

import Link from "next/link";

import { Home, Film, Tv, Users, Clapperboard } from "lucide-react";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      name: "Movies",
      icon: Film,
      href: "/movies",
    },
    {
      name: "TV Shows",
      icon: Tv,
      href: "/tv",
    },
    {
      name: "People",
      icon: Users,
      href: "/people",
    },
  ];

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 z-50  w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
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
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-bold uppercase tracking-widest transition-all hover:text-white",
                    isActive ? "text-white" : "text-neutral-500",
                  )}
                >
                  {item.name}

                  {isActive && (
                    <span className="absolute -bottom-5.5 left-0 h-0.5 w-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile Placeholder */}
          {/* <div className="hidden h-8 w-8 rounded-full border border-neutral-700 bg-neutral-800 md:block" /> */}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/80 px-8 py-4 backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-col items-center gap-1.5"
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

      {/* Mobile Spacer */}
      <div className="h-20 md:hidden" />
    </>
  );
}
