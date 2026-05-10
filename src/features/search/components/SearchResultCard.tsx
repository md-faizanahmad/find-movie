import { MediaCard } from "@/features/home/components/MediaCard";

import { SearchResult } from "../services/search.service";

interface Props {
  item: SearchResult;
}

export function SearchResultCard({ item }: Props) {
  if (item.media_type !== "movie" && item.media_type !== "tv") {
    return null;
  }

  return (
    <MediaCard
      item={{
        id: item.id,
        mediaType: item.media_type,
        title: item.title,
        poster: item.image,
        backdrop: null,
        rating: 0,
        popularity: 0,
        releaseDate: item.year || "",
        overview: item.overview || "",
      }}
    />
  );
}
