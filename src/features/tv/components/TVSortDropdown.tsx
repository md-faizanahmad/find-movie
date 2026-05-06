"use client";

export function TVSortDropdown() {
  return (
    <select className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none">
      <option value="popularity.desc">Trending</option>

      <option value="vote_average.desc">Top Rated</option>

      <option value="first_air_date.desc">Latest Releases</option>
    </select>
  );
}
