import { notFound } from "next/navigation";

import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieInfo } from "@/features/movies/components/MovieInfo";
import { MovieMeta } from "@/features/movies/components/MovieMeta";
import { MovieTrailer } from "@/features/movies/components/MovieTrailer";
import { MovieCast } from "@/features/movies/components/MovieCast";
import { MovieGallery } from "@/features/movies/components/MovieGallery";
import { getMediaDetails } from "@/features/movies/api/getMediaDetails";

interface Props {
  params: Promise<{
    mediaType: "movie" | "tv";
    id: string;
  }>;
}

export default async function DetailsPage({ params }: Props) {
  const { mediaType, id } = await params;

  if (!["movie", "tv"].includes(mediaType)) {
    notFound();
  }

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const media = await getMediaDetails(id, mediaType);

  if (!media) {
    notFound();
  }

  const trailerVideo = media.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <MovieHero
        title={media.title}
        backdrop_path={media.backdrop_path}
        tagline={media.tagline}
        trailerKey={trailerVideo?.key}
      />

      <div className="mx-auto max-w-7xl space-y-4">
        <MovieInfo
          poster_path={media.poster_path}
          overview={media.overview}
          genres={media.genres.map((g) => g.name)}
        />

        <MovieMeta
          runtime={media.runtime}
          release_date={media.release_date}
          vote_average={media.vote_average}
        />
      </div>

      <div className="mx-auto max-w-7xl space-y-12 pb-20">
        <MovieCast cast={media.credits?.cast || []} />

        <MovieTrailer videos={media.videos?.results || []} />

        <MovieGallery backdrops={media.images?.backdrops || []} />
      </div>
    </main>
  );
}
