"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { FilterTabs } from "@/shared/filters/FilterTabs";
import { TV_SORT_FILTERS } from "@/shared/filters/config/tvFilters";

export function TVSortTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") || "popularity.desc";

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);
    params.delete("page");
    router.push(`/tv?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <FilterTabs filters={TV_SORT_FILTERS} active={active} onChange={onChange} />
  );
}
