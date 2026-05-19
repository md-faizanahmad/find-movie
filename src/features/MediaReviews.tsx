// src/features/movies/components/MovieReviews.tsx

import Image from "next/image";
import Link from "next/link";
import { Review } from "./getMediaReviews";

interface Props {
  reviews: Review[];
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

export function MediaReviews({ reviews }: Props) {
  if (!reviews.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Reviews</h2>

      <div className="space-y-5">
        {reviews.slice(0, 5).map((review) => {
          const avatar = review.author_details.avatar_path?.startsWith("/https")
            ? review.author_details.avatar_path.replace("/", "")
            : review.author_details.avatar_path
              ? `${IMAGE_BASE}${review.author_details.avatar_path}`
              : "/placeholder-avatar.png";

          return (
            <article
              key={review.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{review.author}</h3>

                  <p className="text-sm text-neutral-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="line-clamp-6 whitespace-pre-line text-sm leading-7 text-neutral-300">
                {review.content}
              </p>

              <Link
                href={review.url}
                target="_blank"
                className="mt-4 inline-flex text-sm font-medium text-red-400 hover:text-red-300"
              >
                Read Full Review
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
