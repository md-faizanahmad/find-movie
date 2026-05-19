import { notFound } from "next/navigation";

import { getGalleryPage } from "@/lib/gallery/getGalleryPage";

import { galleryCategories } from "@/lib/gallery/galleryCategories";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;

  const category = galleryCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const images = await getGalleryPage(slug);

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-4xl font-bold">{category.title}</h1>

      <GalleryGrid items={images} />
    </main>
  );
}
