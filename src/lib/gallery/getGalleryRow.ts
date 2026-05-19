import { GalleryItem } from "@/@types/galleryCategories";
import { tmdbFetch } from "../tmdb/tmdb";
import { galleryCategories } from "./galleryCategories";

export async function getGalleryRow(slug: string) {
  const category = galleryCategories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error("Category not found");
  }

  const data = await tmdbFetch<any>(category.endpoint, category.params);

  const items: GalleryItem[] = data.results
    .filter((item: any) => {
      return item.poster_path || item.backdrop_path || item.profile_path;
    })
    .slice(0, 12)
    .map((item: any) => ({
      id: item.id,

      title: item.title || item.name || item.original_name,

      imagePath: item.poster_path || item.profile_path || item.backdrop_path,

      mediaType: category.mediaType,
    }));

  return {
    title: category.title,
    slug: category.slug,
    items,
  };
}
