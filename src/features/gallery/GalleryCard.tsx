import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb/image";

interface Props {
  title: string;
  imagePath: string;
}

export function GalleryCard({ title, imagePath }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <Image
        src={getImageUrl(imagePath)}
        alt={title}
        width={400}
        height={600}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}
