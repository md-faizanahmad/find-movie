import Link from "next/link";
import Image from "next/image";

import { SearchResult } from "../services/search.service";

interface Props {
  results: SearchResult[];
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export function SearchResults({ results }: Props) {
  if (!results.length) return null;

  return (
    <div
      className="
        absolute top-full z-50 mt-3
        max-h-[70vh] w-full overflow-y-auto
        rounded-2xl border border-white/10
        bg-neutral-950/95 backdrop-blur-xl
      "
    >
      {results.map((item) => {
        const href =
          item.media_type === "movie"
            ? `/movie/${item.id}`
            : item.media_type === "tv"
              ? `/tv/${item.id}`
              : `/person/${item.id}`;

        return (
          <Link
            key={`${item.media_type}-${item.id}`}
            href={href}
            className="
              flex items-center gap-4
              border-b border-white/5
              p-4 transition-colors
              hover:bg-white/5
            "
          >
            <div className="relative h-20 w-14 overflow-hidden rounded-lg bg-neutral-800">
              {item.image ? (
                <Image
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-neutral-400">
                {item.media_type}
                {item.year ? ` • ${item.year}` : ""}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
