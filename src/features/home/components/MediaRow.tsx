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
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="group/row py-4">
      {/* Title Header */}
      <div className="mb-4 flex items-end justify-between px-6 md:px-10">
        <h2 className="text-lg font-bold tracking-tight text-zinc-200 md:text-2xl">
          {title}
        </h2>

        <Link
          href={href}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-red-500 md:text-xs"
        >
          Explore All
          <ChevronRight
            size={14}
            className="transition-transform group-hover/row:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative">
        {/* Navigation Arrows - Only visible on hover/desktop */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-30 hidden w-12 items-center justify-center bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeft size={30} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-30 hidden w-12 items-center justify-center bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronRight size={30} />
        </button>

        {/* 
            SCROLL CONTAINER FIXES:
            1. overflow-x-auto + overflow-y-visible (allows scale to pop out)
            2. -mx (negative margin) + px (padding) ensures borders aren't cut on the ends
            3. py-4 gives vertical breathing room for the hover scale
        */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto overflow-y-visible scroll-smooth px-6 py-4
            scrollbar-hide snap-x snap-mandatory md:gap-5 md:px-10
            [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-35 flex-none snap-start sm:w-45 md:w-55 lg:w-60"
            >
              <MediaCard item={item} isAuthenticated={isAuthenticated} />
            </div>
          ))}

          {/* View More Card */}
          <Link
            href={href}
            className="flex min-h-52.5 w-35 flex-none snap-start items-center justify-center rounded-xl 
                       border border-zinc-800 bg-zinc-900/30 transition-colors hover:bg-zinc-800
                       sm:w-45 md:h-82.5 md:w-55"
          >
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
              View All
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
