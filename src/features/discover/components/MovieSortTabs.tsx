"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { FilterTabs } from "@/shared/filters/FilterTabs";
import { MOVIE_SORT_FILTERS } from "@/shared/filters/config/movieFilters";

export function MovieSortTabs() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const active = searchParams.get("sort") || "popularity.desc";

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    params.delete("page");

    router.push(`/movies?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <FilterTabs
      filters={MOVIE_SORT_FILTERS}
      active={active}
      onChange={onChange}
    />
  );
}
