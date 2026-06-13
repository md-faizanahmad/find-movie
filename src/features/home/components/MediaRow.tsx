"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaCard } from "./MediaCard";
import { Media } from "../services/home.service";
import { useRef } from "react";

interface Props {
  title: string;
  items: Media[];
  href?: string;
  isAuthenticated?: boolean;
}

export function MediaRow({
  title,
  items,
  href = "#",
  isAuthenticated = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 400;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="group/row py-6 px-6 md:py-12 md:px-8">
      <div className="mb-5 flex items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="relative">
          {/* Blur Background */}
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-2xl" />

          <h2 className="relative inline-block rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-lg font-extrabold tracking-tight backdrop-blur-xl md:text-2xl lg:text-3xl">
            <span className="animate-gradient bg-linear-to-r from-red-600 via-white to-red-500 bg-size-[200%_auto] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </div>

        <Link
          href={href}
          className="group flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-red-500 md:text-sm"
        >
          Explore All
          <ChevronRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative">
        {/* Desktop Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/70 p-2 text-white backdrop-blur transition hover:bg-black md:flex"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/70 p-2 text-white backdrop-blur transition hover:bg-black md:flex"
        >
          <ChevronRight size={22} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-start gap-3 overflow-x-auto overflow-y-visible scroll-smooth px-4 py-6
    snap-x snap-mandatory
    scrollbar-hide
    md:gap-5 md:px-10
    [-ms-overflow-style:none]
    scrollbar-none
    [&::-webkit-scrollbar]:hidden
  "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-35 flex-none
        snap-start
        sm:w-45
        md:w-55
        lg:w-65
      "
            >
              {/* <MediaCard item={item} /> */}
              <MediaCard item={item} isAuthenticated={isAuthenticated} />
              {/* <MediaCard item={item} /> */}
            </div>
          ))}

          <Link
            href={href}
            className="
    relative flex aspect-2/3 flex-none snap-start 
    w-35 sm:w-45 md:w-55 lg:w-60
    flex-col items-center justify-center rounded-xl 
    border border-white/5 bg-zinc-900/30 
    transition-all duration-300
    hover:bg-zinc-900 hover:border-red-600/50 hover:scale-[1.03]
    group
  "
          >
            {/* Subtle background icon for a "premium" feel */}
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-zinc-500 transition-colors group-hover:bg-red-600/10 group-hover:text-red-500">
              <ChevronRight size={24} />
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-zinc-200 md:text-xs">
              Explore All
            </span>

            {/* Bottom subtle glow on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-red-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
