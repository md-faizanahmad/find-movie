import Image from "next/image";
import Link from "next/link";

import { SearchResult } from "../services/search.service";

interface Props {
  item: SearchResult;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function SearchResultCard({ item }: Props) {
  const href =
    item.media_type === "movie"
      ? `/movie/${item.id}`
      : item.media_type === "tv"
        ? `/tv/${item.id}`
        : `/person/${item.id}`;

  return (
    <Link
      href={href}
      className="
        group overflow-hidden rounded-2xl
        border border-white/5
        bg-neutral-900/40
        transition-all duration-300
        hover:border-white/10
        hover:bg-neutral-900/70
      "
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-800">
        {item.image ? (
          <Image
            src={`${IMAGE_BASE_URL}${item.image}`}
            alt={item.title}
            fill
            className="
              object-cover transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full items-center justify-center
              text-sm text-neutral-500
            "
          >
            No Image
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 font-semibold text-white">{item.title}</h3>

        <p className="text-sm capitalize text-neutral-400">
          {item.media_type}
          {item.year ? ` • ${item.year}` : ""}
        </p>
      </div>
    </Link>
  );
}
