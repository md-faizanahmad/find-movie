export type MediaType = "movie" | "tv" | "person";

export interface GalleryItem {
  id: number;
  title: string;
  imagePath: string;
  mediaType: MediaType;
}
