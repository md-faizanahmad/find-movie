import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieInfo } from "@/features/movies/components/MovieInfo";
import { MovieMeta } from "@/features/movies/components/MovieMeta";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/features/movies/api/getMovieDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params; // ✅ FIXED

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const movie = await getMovieDetails(id);

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
        genres={movie.genres.map((g) => g.name)}
      />

      <MovieMeta
        runtime={movie.runtime}
        release_date={movie.release_date}
        vote_average={movie.vote_average}
      />
    </div>
  );
}
