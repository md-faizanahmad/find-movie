import { Film } from "lucide-react";

export function MovieEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-neutral-950 px-6 py-20 text-center">
      <div className="rounded-full bg-neutral-900 p-5">
        <Film className="h-10 w-10 text-neutral-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">No Movies Found</h2>

      <p className="mt-3 max-w-md text-sm text-neutral-400 md:text-base">
        We couldn&apos;t find any movies matching your current filters. Try
        changing language, sorting, or search keywords.
      </p>
    </div>
  );
}
