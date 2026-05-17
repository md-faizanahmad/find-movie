"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Backdrop } from "@/@types/movie.details.types";
import Link from "next/link";

interface Props {
  backdrops: Backdrop[];
  mediaType: "movie" | "tv";
  mediaId: number;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export function Gallery({ backdrops, mediaId, mediaType }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!backdrops?.length) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted for larger image cards
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <section className="px-4 md:px-8 mt-8 md:mt-12 mb-10 select-none">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight border-l-4 border-yellow-500 pl-3">
          Scenes
        </h2>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:block">
          {backdrops.length}
        </span>
        <Link
          href={`/gallery/${mediaType}/${mediaId}`}
          className="text-sm font-medium text-yellow-400 hover:text-yellow-300 transition"
        >
          View All
        </Link>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`flex gap-3 md:gap-5 overflow-x-auto pb-6 transition-all
                   snap-x snap-mandatory scroll-smooth
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                   ${isDragging ? "cursor-grabbing active:snap-none" : "cursor-grab"}`}
      >
        {backdrops.slice(0, 15).map((img, i) => (
          <div
            key={img.file_path}
            className="relative w-[85vw] md:w-112.5 aspect-video shrink-0 
                       snap-start rounded-xl md:rounded-2xl overflow-hidden 
                       border border-white/10 shadow-xl group pointer-events-none"
          >
            <Image
              src={`${IMAGE_BASE}${img.file_path}`}
              alt={`Scene ${i + 1}`}
              fill
              draggable={false}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 85vw, 450px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Interaction Icon */}
            <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ZoomIcon />
            </div>
          </div>
        ))}

        <div className="shrink-0 w-4 md:w-8" />
      </div>
    </section>
  );
}

function ZoomIcon() {
  return (
    <div className="bg-yellow-500 p-3 rounded-full shadow-2xl">
      <svg
        className="w-5 h-5 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
        />
      </svg>
    </div>
  );
}
