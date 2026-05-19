import { tmdbFetch } from "../tmdb/tmdb";
import { galleryCategories } from "./galleryCategories";

export async function getGalleryPage(slug: string) {
  const category = galleryCategories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error("Category not found");
  }

  const data = await tmdbFetch<any>(category.endpoint, category.params);

  const entities = data.results.slice(0, 20);

  const images = await Promise.all(
    entities.map(async (entity: any) => {
      const endpoint =
        category.mediaType === "movie"
          ? `/movie/${entity.id}/images`
          : category.mediaType === "tv"
            ? `/tv/${entity.id}/images`
            : `/person/${entity.id}/images`;

      const imageData = await tmdbFetch<any>(endpoint);

      let selectedImages = [];

      if (category.mediaType === "person") {
        selectedImages = imageData.profiles || [];
      } else {
        selectedImages = imageData.backdrops || [];
      }

      return selectedImages.slice(0, 5).map((img: any) => ({
        id: `${entity.id}-${img.file_path}`,
        imagePath: img.file_path,
        title: entity.title || entity.name || entity.original_name,
      }));
    }),
  );

  return images.flat();
}
