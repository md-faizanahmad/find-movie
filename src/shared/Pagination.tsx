import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  language: string;
}

export function Pagination({ page, totalPages, language }: Props) {
  // Logic to prevent going out of bounds
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 pb-8"
      aria-label="Pagination"
    >
      {/* Page Status for Mobile Context */}
      <div className="text-sm font-medium text-neutral-500 sm:order-2">
        Page <span className="text-white">{page}</span> of{" "}
        <span className="text-white">{totalPages.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-3 sm:order-1">
        {/* Previous Button */}
        <Link
          href={`/movies?language=${language}&page=${prevPage}`}
          className={`group flex items-center gap-2 rounded-full px-6 py-3 transition-all border ${
            page <= 1
              ? "pointer-events-none border-neutral-800 text-neutral-700"
              : "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95"
          }`}
        >
          <ChevronLeftIcon />
          <span className="hidden sm:inline font-semibold">Previous</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:order-3">
        {/* Next Button */}
        <Link
          href={`/movies?language=${language}&page=${nextPage}`}
          className={`group flex items-center gap-2 rounded-full px-8 py-3 transition-all ${
            page >= totalPages
              ? "pointer-events-none bg-neutral-800 text-neutral-600"
              : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-95"
          }`}
        >
          <span className="font-semibold text-base">Next Page</span>
          <ChevronRightIcon />
        </Link>
      </div>
    </nav>
  );
}

// Minimal Icons to keep code clean
function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
