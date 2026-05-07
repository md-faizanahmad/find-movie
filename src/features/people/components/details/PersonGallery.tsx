import Image from "next/image";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface Props {
  images: any[];
}

export function PersonGallery({ images }: Props) {
  if (!images.length) return null;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Gallery</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.slice(0, 8).map((image, index) => (
          <div
            key={index}
            className="relative aspect-[2/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={`${IMAGE_BASE_URL}/w500${image.file_path}`}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
