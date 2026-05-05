// src/features/home/components/MediaRow.tsx

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MediaCard } from "./MediaCard";
import { Media } from "../services/home.service";

interface Props {
  title: string;
  items: Media[];
  href?: string;
}

export function MediaRow({ title, items, href = "#" }: Props) {
  return (
    <section className="group/row py-6 md:py-10">
      <div className="mb-5 flex items-end justify-between px-6 md:px-12 lg:px-16">
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
        <div
          className="
          flex gap-3 overflow-x-auto px-6 pb-4 
          scrollbar-hide md:gap-5 md:px-12 lg:px-16
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-35 flex-none sm:min-w-45 md:min-w-55 lg:min-w-65"
            >
              <MediaCard item={item} />
            </div>
          ))}

          <Link
            href={href}
            className="flex min-w-35 flex-none items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 transition-colors hover:bg-neutral-800 sm:min-w-45"
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
