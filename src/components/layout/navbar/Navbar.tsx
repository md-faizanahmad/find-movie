"use client";

import Link from "next/link";
import { Home, Film, Tv, Users, Clapperboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Movies", icon: Film, href: "/movies" },
    { name: "TV Shows", icon: Tv, href: "/tv" },
    { name: "People", icon: Users, href: "/people" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          // Transparent to Black Gradient when at top, Solid Black when scrolled
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-linear-to-b from-black/80 via-black/20 to-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
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
                    "relative text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-white",
                    isActive ? "text-white" : "text-neutral-400",
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile Placeholder */}
          <div className="hidden h-9 w-9 cursor-pointer rounded-full border border-white/10 bg-neutral-900 transition-colors hover:border-red-600 md:block" />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/80 px-8 py-3 backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-col items-center gap-1"
              >
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-red-600/10 text-red-600"
                      : "text-neutral-500",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      isActive ? "scale-110" : "group-active:scale-95",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span
                  className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
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
    </>
  );
}
