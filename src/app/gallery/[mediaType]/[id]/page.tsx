import Image from "next/image";
import { notFound } from "next/navigation";
import { getMediaDetails } from "@/features/movies/api/getMediaDetails";

interface Props {
  params: Promise<{
    mediaType: "movie" | "tv";
    id: string;
  }>;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default async function GalleryPage({ params }: Props) {
  const { mediaType, id } = await params;

  if (mediaType !== "movie" && mediaType !== "tv") {
    notFound();
  }

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const media = await getMediaDetails(id, mediaType);

  if (!media) {
    notFound();
  }

  const images = media.images?.backdrops || [];

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {media.title} Gallery
          </h1>

          <p className="text-zinc-400 mt-2">{images.length} Images</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img, i) => (
            <div
              key={img.file_path}
              className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={`${IMAGE_BASE}${img.file_path}`}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition duration-500"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
