import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  query?: string;
}

export function PeoplePagination({ page, totalPages, query }: Props) {
  function buildUrl(nextPage: number) {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    if (query) {
      params.set("q", query);
    }
    return `/people?${params.toString()}`;
  }

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <footer className="mt-12 flex flex-col items-center justify-center gap-5 border-t border-white/5 pt-10 pb-8 md:flex-row md:gap-10">
      {/* 1. Status Info (Top on mobile, Middle on desktop) */}
      <div className="order-1 text-sm font-medium text-neutral-500 md:order-2">
        Page <span className="text-white">{page}</span>
        <span className="mx-1 text-neutral-600 font-normal italic">of</span>
        <span className="text-white">{totalPages.toLocaleString()}</span>
      </div>

      {/* 2. Controls Group */}
      <div className="order-2 flex w-full items-center justify-center gap-3 sm:w-auto md:order-1">
        {/* Previous Button */}
        <Link
          href={buildUrl(page - 1)}
          className={`group flex h-12 w-12 items-center justify-center rounded-full transition-all border md:h-auto md:w-auto md:px-6 md:py-3 
            ${
              !hasPrev
                ? "pointer-events-none border-neutral-800 text-neutral-700"
                : "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95"
            }`}
        >
          <ChevronLeftIcon />
          <span className="hidden md:inline ml-2 font-semibold">Previous</span>
        </Link>

        {/* Next Button */}
        <Link
          href={buildUrl(page + 1)}
          className={`group flex h-12 flex-1 items-center justify-center gap-2 rounded-full transition-all sm:flex-none md:h-auto md:px-10 md:py-3
            ${
              !hasNext
                ? "pointer-events-none bg-neutral-800 text-neutral-600"
                : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-95"
            }`}
        >
          <span className="font-bold">Next Page</span>
          <ChevronRightIcon />
        </Link>
      </div>
    </footer>
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
