// src/features/movies/api/getMediaReviews.ts

interface AuthorDetails {
  avatar_path: string | null;
  rating: number | null;
  username: string;
}

export interface Review {
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

export async function getMediaReviews(
  mediaType: "movie" | "tv",
  mediaId: number,
): Promise<Review[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
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
