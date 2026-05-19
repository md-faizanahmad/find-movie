import { GalleryCard } from "./GalleryCard";

interface Props {
  items: any[];
}

export function GalleryGrid({ items }: Props) {
  return (
    <div className="columns-2 md:columns-4 gap-4 space-y-4">
      {items.map((item) => (
        <GalleryCard
          key={item.id}
          title={item.title}
          imagePath={item.imagePath}
        />
      ))}
    </div>
  );
}
