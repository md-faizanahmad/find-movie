import { Tv } from "lucide-react";

export function TVEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-neutral-950 px-6 py-20 text-center">
      <div className="rounded-full bg-neutral-900 p-5">
        <Tv className="h-10 w-10 text-neutral-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">No TV Shows Found</h2>

      <p className="mt-3 max-w-md text-sm text-neutral-400 md:text-base">
        We couldn&apos;t find any TV shows matching your current filters. Try
        changing language, sorting, or search keywords.
      </p>
    </div>
  );
}
