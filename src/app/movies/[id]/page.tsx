import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieInfo } from "@/features/movies/components/MovieInfo";
import { MovieMeta } from "@/features/movies/components/MovieMeta";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/features/movies/api/getMovieDetails";
import { MovieTrailer } from "@/features/movies/components/MovieTrailer";
import { MovieCast } from "@/features/movies/components/MovieCast";
import { MovieGallery } from "@/features/movies/components/MovieGallery";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  // Validation: TMDB IDs are always numeric
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  // Find the trailer key to pass to the Hero for the video background
  const trailerVideo = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <main className="bg-black min-h-screen text-white selection:bg-yellow-500/30">
      {/* Hero Section with Video Background Support */}
      <MovieHero
        title={movie.title}
        backdrop_path={movie.backdrop_path}
        tagline={movie.tagline}
        trailerKey={trailerVideo?.key}
      />

      {/* Primary Details */}
      <div className="max-w-7xl mx-auto space-y-4">
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

      {/* Media & Credits Sections */}
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        <MovieCast cast={movie.credits?.cast || []} />

        {/* We keep MovieTrailer here as well for a dedicated viewing area */}
        <MovieTrailer videos={movie.videos?.results || []} />

        <MovieGallery backdrops={movie.images?.backdrops || []} />
      </div>
    </main>
  );
}
