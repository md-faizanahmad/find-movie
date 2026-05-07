import { MediaCard } from "@/features/home/components/MediaCard";

interface Props {
  credits: any[];
}

export function PersonKnownFor({ credits }: Props) {
  const filtered = credits.slice(0, 12);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Known For</h2>

      <div
        className="
          grid
          grid-cols-2
          gap-x-3
          gap-y-6

          sm:grid-cols-3
          sm:gap-x-4

          md:grid-cols-4
          md:gap-x-5

          lg:grid-cols-5

          xl:grid-cols-6
        "
      >
        {filtered.map((item) => (
          <MediaCard
            key={item.id}
            item={{
              id: item.id,

              mediaType: item.media_type,

              title: item.title || item.name,

              poster: item.poster_path,

              backdrop: item.backdrop_path,

              rating: item.vote_average,

              popularity: item.popularity,

              releaseDate: item.release_date || item.first_air_date,
            }}
          />
        ))}
      </div>
    </section>
  );
}
