import { Users } from "lucide-react";

export function PeopleEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl   px-6 py-20 text-center">
      <div className="rounded-full bg-neutral-900 p-4">
        <Users className="h-8 w-8 text-neutral-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">No People Found</h2>

      <p className="mt-3 max-w-md text-sm text-neutral-400 md:text-base">
        We couldn&apos;t find any actors, actresses, or celebrities matching
        your search.
      </p>
    </div>
  );
}
