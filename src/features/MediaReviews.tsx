import Link from "next/link";
import { User } from "lucide-react";

import { Review } from "./getMediaReviews";

interface Props {
  reviews: Review[];
}

export function MediaReviews({ reviews }: Props) {
  if (!reviews.length) return null;

  return (
    <section className="relative space-y-6 px-4 md:px-0">
      {/* Ambient Blur */}
      <div className="pointer-events-none absolute -top-10 -left-10 -z-10 h-40 w-40 rounded-full bg-red-600/10 blur-[80px]" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 -z-10 h-40 w-40 rounded-full bg-red-600/10 blur-[80px]" />

      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white md:text-2xl">
        User
        <span className="border-l-4 border-red-500 pl-3 tracking-tight text-white">
          Reviews
        </span>
        <span className="rounded-full border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs font-normal text-neutral-500">
          {reviews.length}
        </span>
      </h2>

      <div className="space-y-4 md:space-y-5">
        {reviews.slice(0, 5).map((review) => {
          const rating = review.author_details?.rating;

          return (
            <article
              key={review.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-black/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-red-900/40 hover:shadow-[0_0_25px_rgba(220,38,38,0.06)] md:p-6"
            >
              <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  {/* User Icon Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 ring-2 ring-neutral-800 transition-all group-hover:ring-red-600/30 md:h-12 md:w-12">
                    <User className="h-5 w-5 text-neutral-400 md:h-6 md:w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-200 transition-colors group-hover:text-white md:text-base">
                      {review.author}
                    </h3>

                    <p className="text-xs text-neutral-500 md:text-sm">
                      {new Date(review.created_at).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                {rating !== undefined && rating !== null && (
                  <div className="flex items-center gap-1 self-start rounded-full border border-red-900/30 bg-red-950/40 px-2.5 py-1 text-xs font-medium text-red-400 sm:self-center">
                    <svg
                      className="h-3.5 w-3.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>

                    <span>
                      {rating}
                      <span className="text-[10px] text-red-600/70">/10</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <p className="line-clamp-4 whitespace-pre-line text-xs leading-6 text-neutral-400 transition-colors group-hover:text-neutral-300 md:line-clamp-6 md:text-sm md:leading-7">
                {review.content}
              </p>

              {/* Link */}
              <div className="mt-4 flex justify-end sm:justify-start">
                <Link
                  href={review.url}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-500 transition-all hover:text-red-400 group-hover:translate-x-0.5 md:text-sm"
                >
                  Read Full Review
                  <span className="text-xs opacity-70">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
