import Image from "next/image";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface Props {
  person: any;
}

export function PersonHero({ person }: Props) {
  const imageUrl = person.profile_path
    ? `${IMAGE_BASE_URL}/w780${person.profile_path}`
    : null;

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-24 md:flex-row md:items-end md:px-8 lg:px-12">
        {/* Image */}
        <div className="relative mx-auto aspect-[2/3] w-60 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 md:mx-0 md:w-80">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={person.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-neutral-900" />
          )}
        </div>

        {/* Info */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            {person.name}
          </h1>

          <p className="mt-4 text-lg text-neutral-400">
            {person.known_for_department}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-neutral-300">
            {person.birthday && <div>Born: {person.birthday}</div>}

            {person.place_of_birth && <div>• {person.place_of_birth}</div>}
          </div>

          {person.also_known_as?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-neutral-500">Also known as</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {person.also_known_as.slice(0, 5).map((alias: string) => (
                  <span
                    key={alias}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                  >
                    {alias}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
