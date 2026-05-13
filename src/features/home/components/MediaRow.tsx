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

    const amount = 400;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="group/row py-6 px-6 md:py-12 md:px-8">
      <div className="mb-5 flex items-end justify-between px-6 md:px-8 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-red-800 md:text-2xl lg:text-3xl">
          {title}
        </h2>

        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-red-500 md:text-sm"
        >
          Explore All
          <ChevronRight
            size={16}
            className="transition-transform group-hover/row:translate-x-1"
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
          className="flex items-start gap-3 overflow-x-auto overflow-y-hidden scroll-smooth px-4 py-6
    snap-x snap-mandatory
    scrollbar-hide
    md:gap-5 md:px-10
    [-ms-overflow-style:none]
    [scrollbar-width:none]
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
              <MediaCard item={item} />
            </div>
          ))}

          <Link
            href={href}
            className="
              flex min-w-35 flex-none snap-start
              items-center justify-center rounded-xl
              border border-neutral-800 bg-neutral-900/50
              transition-colors hover:bg-neutral-800
              sm:min-w-45
            "
          >
            <span className="text-sm font-bold text-neutral-500">
              View More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
