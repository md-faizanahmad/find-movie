// src/components/movie/MovieReviews.tsx
import Image from "next/image";
import Link from "next/link";

interface AuthorDetails {
  avatar_path: string | null;
  rating: number | null;
  username: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
  author_details: AuthorDetails;
}

interface ReviewsResponse {
  results: Review[];
}

interface Props {
  movieId: number;
}

const TMDB_API = "https://api.themoviedb.org/3";
const AVATAR_BASE = "https://image.tmdb.org/t/p/w185";

async function getReviews(movieId: number): Promise<Review[]> {
  const res = await fetch(
    `${TMDB_API}/movie/${movieId}/reviews?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data: ReviewsResponse = await res.json();
  return data.results;
}

export async function MovieReviews({ movieId }: Props) {
  const reviews = await getReviews(movieId);

  if (!reviews.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>

        <span className="text-sm text-neutral-400">
          {reviews.length} Reviews
        </span>
      </div>

      <div className="space-y-5">
        {reviews.slice(0, 5).map((review) => {
          const avatar = review.author_details.avatar_path?.startsWith("/https")
            ? review.author_details.avatar_path.replace("/", "")
            : review.author_details.avatar_path
              ? `${AVATAR_BASE}${review.author_details.avatar_path}`
              : "/placeholder-avatar.png";

          return (
            <article
              key={review.id}
              className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-neutral-800">
                  <Image
                    src={avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {review.author}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-neutral-400">
                    <span>
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>

                    {review.author_details.rating && (
                      <span className="rounded bg-yellow-500/15 px-2 py-0.5 text-yellow-400">
                        ★ {review.author_details.rating}/10
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="line-clamp-6 whitespace-pre-line text-sm leading-7 text-neutral-300">
                {review.content}
              </p>

              <Link
                href={review.url}
                target="_blank"
                className="mt-4 inline-flex text-sm font-medium text-red-400 transition hover:text-red-300"
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
