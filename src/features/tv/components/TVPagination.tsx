import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  language: string;
}

export function TVPagination({ currentPage, totalPages, language }: Props) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      className="flex flex-col items-center justify-center gap-5 pt-10 pb-8 md:flex-row md:gap-10"
      aria-label="TV Series Pagination"
    >
      {/* 1. Page Info (Top on mobile, Order-2 on desktop) */}
      <div className="order-1 text-sm font-medium text-neutral-500 md:order-2">
        Season Page <span className="text-white">{currentPage}</span>
        <span className="mx-1 text-neutral-600 font-normal italic">of</span>
        <span className="text-white">{totalPages.toLocaleString()}</span>
      </div>

      {/* 2. Navigation Controls */}
      <div className="order-2 flex w-full items-center justify-center gap-3 sm:w-auto md:order-1">
        {/* Previous Button - Collapses to circle on mobile */}
        <Link
          href={`/tv-shows?language=${language}&page=${prevPage}`}
          className={`group flex h-12 w-12 items-center justify-center rounded-full transition-all border md:h-auto md:w-auto md:px-6 md:py-3 
            ${
              !hasPrev
                ? "pointer-events-none border-neutral-800 text-neutral-700"
                : "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 shadow-lg"
            }`}
        >
          <ChevronLeftIcon />
          <span className="hidden md:inline ml-2 font-semibold tracking-wide text-sm">
            Previous
          </span>
        </Link>

        {/* Next Button - Expanded for mobile CTA */}
        <Link
          href={`/tv-shows?language=${language}&page=${nextPage}`}
          className={`group flex h-12 flex-1 items-center justify-center gap-2 rounded-full transition-all sm:flex-none md:h-auto md:px-10 md:py-3
            ${
              !hasNext
                ? "pointer-events-none bg-neutral-800 text-neutral-600"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95"
            }`}
        >
          <span className="font-bold tracking-tight">Next Episodes</span>
          <ChevronRightIcon />
        </Link>
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
