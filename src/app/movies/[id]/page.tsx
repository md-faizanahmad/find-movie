import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieInfo } from "@/features/movies/components/MovieInfo";
import { MovieMeta } from "@/features/movies/components/MovieMeta";
import { apiClient } from "@/lib/api/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
async function getMovie(id: string) {
  try {
    const res = await apiClient.get(`/movie/${id}`);
    return res.data;
  } catch (error) {
    console.error("Movie fetch failed:", error);
    return null;
  }
}
export default async function MovieDetailsPage({ params }: Props) {
  // ✅ Validate FIRST
  if (!params.id || isNaN(Number(params.id))) {
    notFound();
  }

  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <MovieHero
        title={movie.title}
        backdrop_path={movie.backdrop_path}
        tagline={movie.tagline}
      />

      <MovieInfo
        poster_path={movie.poster_path}
        overview={movie.overview}
        genres={movie.genres}
      />

      <MovieMeta
        runtime={movie.runtime}
        release_date={movie.release_date}
        vote_average={movie.vote_average}
      />
    </div>
  );
}
