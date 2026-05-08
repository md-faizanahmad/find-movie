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
        group relative overflow-hidden rounded-xl
        border border-white/10
        bg-neutral-900/40
        transition-all duration-300
        hover:bg-neutral-800/60
        active:scale-[0.98] 
      "
    >
      {/* Media Type Badge - Great for quick scanning on mobile */}
      <div className="absolute top-2 right-2 z-10">
        <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
          {item.media_type}
        </span>
      </div>

      <div className="relative aspect-2/3 w-full overflow-hidden bg-neutral-800">
        {item.image ? (
          <Image
            src={`${IMAGE_BASE_URL}${item.image}`}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="
              object-cover transition-transform duration-500
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-neutral-900 text-neutral-500">
            <span className="text-xs font-medium italic opacity-50">
              No Poster
            </span>
          </div>
        )}

        {/* Mobile Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 md:hidden" />
      </div>

      <div className="flex flex-col justify-between p-3 md:p-4">
        <div>
          <h3 className="line-clamp-1 text-sm font-bold text-white md:text-base leading-tight">
            {item.title}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 md:text-xs">
            {item.year && <span>{item.year}</span>}
            {item.year && (
              <span className="h-1 w-1 rounded-full bg-neutral-700" />
            )}
            <span className="capitalize">{item.media_type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
