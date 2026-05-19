import Link from "next/link";
import { GalleryCard } from "./GalleryCard";
import { GalleryItem } from "@/@types/galleryCategories";

interface Props {
  title: string;
  href: string;
  items: GalleryItem[];
}

export function ImageCardRow({ title, href, items }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Link href={href} className="text-sm text-red-500">
          Explore All
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {items.map((item) => (
          <div key={item.id} className="min-w-[180px]">
            <GalleryCard title={item.title} imagePath={item.imagePath} />
          </div>
        ))}
      </div>
    </section>
  );
}
