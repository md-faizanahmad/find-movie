"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  language?: string;
  query?: string;
}

export function Pagination({ page, totalPages, language, query }: Props) {
  const pathname = usePathname();

  function buildUrl(targetPage: number) {
    const params = new URLSearchParams();

    params.set("page", String(targetPage));

    if (language) {
      params.set("language", language);
    }

    if (query) {
      params.set("query", query);
    }

    return `${pathname}?${params.toString()}`;
  }

  const prevPage = Math.max(page - 1, 1);

  const nextPage = Math.min(page + 1, totalPages);

  return (
    <nav
      className="flex flex-col items-center justify-center gap-4 pb-8 pt-10 md:flex-row md:gap-8"
      aria-label="Pagination"
    >
      {/* Buttons */}
      <div className="order-2 flex w-full items-center justify-center gap-3 sm:w-auto md:order-1">
        {/* Previous */}
        <Link
          href={buildUrl(prevPage)}
          scroll={false}
          aria-disabled={page <= 1}
          className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all md:h-auto md:w-auto md:px-4 md:py-2 ${
            page <= 1
              ? "pointer-events-none border-neutral-800 text-neutral-700"
              : "border-neutral-700 bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 active:scale-95"
          }`}
        >
          <ChevronLeftIcon />

          <span className="ml-2 hidden text-sm font-semibold md:inline">
            Previous
          </span>
        </Link>

        {/* Next */}
        <Link
          href={buildUrl(nextPage)}
          scroll={false}
          aria-disabled={page >= totalPages}
          className={`group flex flex-1 items-center justify-center rounded-full px-8 py-3 transition-all md:flex-none md:px-7 md:py-2 ${
            page >= totalPages
              ? "pointer-events-none bg-neutral-800 text-neutral-600"
              : "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700 active:scale-95"
          }`}
        >
          <span className="mr-1 text-sm font-semibold">Next Page</span>

          <ChevronRightIcon />
        </Link>
      </div>

      {/* Status */}
      <div className="order-1 text-sm font-medium text-neutral-500 md:order-2">
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
