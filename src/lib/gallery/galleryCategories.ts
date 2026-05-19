import { MediaType } from "@/@types/galleryCategories";

interface GalleryCategory {
  slug: string;
  title: string;
  mediaType: MediaType;
  endpoint: string;
  params?: Record<string, string>;
}

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "hollywood-movies",
    title: "Hollywood Movies",
    mediaType: "movie",
    endpoint: "/discover/movie",
    params: {
      with_original_language: "en",
      sort_by: "popularity.desc",
    },
  },

  {
    slug: "hollywood-series",
    title: "Hollywood Series",
    mediaType: "tv",
    endpoint: "/discover/tv",
    params: {
      with_original_language: "en",
      sort_by: "popularity.desc",
    },
  },

  {
    slug: "popular-actors",
    title: "Popular Actors",
    mediaType: "person",
    endpoint: "/person/popular",
  },
];
