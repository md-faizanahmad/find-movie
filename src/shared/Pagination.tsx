import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  language: string;
}

export function Pagination({ page, totalPages, language }: Props) {
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <nav
      className="flex flex-col items-center justify-center gap-4 pt-10 pb-8 md:flex-row md:gap-8"
      aria-label="Pagination"
    >
      {/* Container for Buttons: Side-by-side on mobile */}
      <div className="flex items-center justify-center gap-3 order-2 md:order-1">
        {/* Previous Button */}
        <Link
          href={`/movies?language=${language}&page=${prevPage}`}
          className={`group flex items-center justify-center rounded-full transition-all border
            w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3
            ${
              page <= 1
                ? "pointer-events-none border-neutral-800 text-neutral-700"
                : "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 shadow-lg"
            }`}
        >
          <ChevronLeftIcon />
          <span className="hidden md:inline font-semibold ml-2">Previous</span>
        </Link>

        {/* Next Button */}
        <Link
          href={`/movies?language=${language}&page=${nextPage}`}
          className={`group flex items-center justify-center rounded-full transition-all flex-1 md:flex-none
            px-8 py-3 md:px-10
            ${
              page >= totalPages
                ? "pointer-events-none bg-neutral-800 text-neutral-600"
                : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-95"
            }`}
        >
          <span className="font-semibold text-base mr-1">Next Page</span>
          <ChevronRightIcon />
        </Link>
      </div>

      {/* Page Status: Appears above buttons on mobile for quick context */}
      <div className="text-sm font-medium text-neutral-500 order-1 md:order-2">
        Page <span className="text-white">{page}</span>
        <span className="mx-1">of</span>
        <span className="text-white">{totalPages.toLocaleString()}</span>
      </div>
    </nav>
  );
}

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
