import { SearchEmpty } from "./SearchEmpty";
import { SearchResultCard } from "./SearchResultCard";

import { SearchResult } from "../services/search.service";

interface Props {
  results: SearchResult[];

  query: string;
}

export function SearchGrid({ results, query }: Props) {
  if (!query.trim()) return null;

  if (!results.length) {
    return <SearchEmpty query={query} />;
  }

  return (
    <div
      className="
        grid grid-cols-2 gap-4
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      "
    >
      {results.map((item) => (
        <SearchResultCard key={`${item.media_type}-${item.id}`} item={item} />
      ))}
    </div>
  );
}
