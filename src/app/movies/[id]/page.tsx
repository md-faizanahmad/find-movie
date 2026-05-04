import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieInfo } from "@/features/movies/components/MovieInfo";
import { MovieMeta } from "@/features/movies/components/MovieMeta";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/features/movies/api/getMovieDetails";

interface Props {
  params: {
    id: string;
  };
}

export default async function MovieDetailsPage({ params }: Props) {
  if (!/^\d+$/.test(params.id)) {
    notFound();
  }

  const movie = await getMovieDetails(params.id);
  console.log("MOVIE DATA:", movie);

  if (!movie) {
    console.log("MOVIE IS NULL → triggering 404");
    notFound();
  }
  if (!movie) {
    notFound();
  }

  console.log("ENV PAGE:", process.env.TMDB_BASE_URL);
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
        genres={movie.genres.map((g) => g.name)} // ✅ typed, no any
      />

      <MovieMeta
        runtime={movie.runtime}
        release_date={movie.release_date}
        vote_average={movie.vote_average}
      />
    </div>
  );
}
