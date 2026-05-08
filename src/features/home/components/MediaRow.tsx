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
}

export function MediaRow({ title, items, href = "#" }: Props) {
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
    <section className="group/row py-6 md:py-10">
      {/* 1. Header Container - Now aligned with grid */}
      <div className="mb-4 flex items-end justify-between px-6 md:px-12 lg:px-16">
        <h2 className="text-xl font-black uppercase tracking-tighter text-white md:text-3xl">
          <span className="mr-2 text-red-600">|</span>
          {title}
        </h2>

        <Link
          href={href}
          className="group flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-white md:text-xs"
        >
          Explore All
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative">
        {/* Desktop Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-black/80 p-3 text-white shadow-2xl backdrop-blur-md transition hover:scale-110 md:flex border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-black/80 p-3 text-white shadow-2xl backdrop-blur-md transition hover:scale-110 md:flex border border-white/10"
        >
          <ChevronRight size={24} />
        </button>

        {/* 2. Scroll Container - Full width on mobile */}
        <div
          ref={scrollRef}
          className="
            flex gap-3 overflow-x-auto scroll-smooth px-6 pb-6
            snap-x snap-mandatory scrollbar-hide
            md:gap-5 md:px-12 lg:px-16
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="
                w-35 flex-none snap-start 
                sm:w-45 md:w-55 lg:w-65
              "
            >
              <MediaCard item={item} />
            </div>
          ))}

          {/* View More Card */}
          <Link
            href={href}
            className="
              flex w-35 flex-none snap-start flex-col
              items-center justify-center rounded-xl
              border border-white/5 bg-neutral-900/40
              transition-all hover:bg-neutral-800 sm:w-45
            "
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/10 text-red-600 mb-2">
              <ChevronRight size={20} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-tighter text-neutral-400">
              View More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
