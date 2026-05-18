"use client";

import { useEffect, useMemo, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  language?: string;
  query?: string;
}

export function Pagination({ page, totalPages, language, query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  const buildUrl = useMemo(() => {
    return (targetPage: number) => {
      const params = new URLSearchParams();
      params.set("page", String(targetPage));
      if (language) {
        params.set("language", language);
      }
      if (query) {
        params.set("query", query);
      }
      return `${pathname}?${params.toString()}`;
    };
  }, [language, pathname, query]);

  // Prefetch nearby pages
  useEffect(() => {
    router.prefetch(buildUrl(nextPage));
    if (page > 1) {
      router.prefetch(buildUrl(prevPage));
    }
  }, [buildUrl, nextPage, page, prevPage, router]);
  function handleNavigate(targetPage: number) {
    startTransition(() => {
      router.push(buildUrl(targetPage), {
        scroll: false,
      });
    });
  }

  return (
    <nav
      className="flex flex-col items-center justify-center gap-3 pb-8 pt-10 md:flex-row md:justify-between md:gap-5"
      aria-label="Pagination"
    >
      {/* Buttons */}
      <div
        className={`order-2 flex w-full items-center justify-center gap-3 transition-opacity duration-200 sm:w-auto md:order-1 ${
          isPending ? "opacity-70" : "opacity-100"
        }`}
      >
        {/* Previous */}
        <button
          onClick={() => handleNavigate(prevPage)}
          disabled={page <= 1 || isPending}
          className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all md:h-12 md:w-auto md:px-5 md:py-2.5 ${
            page <= 1
              ? "pointer-events-none border-neutral-800 text-neutral-700"
              : "border-neutral-700 bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 active:scale-95"
          }`}
        >
          <ChevronLeftIcon />

          <span className="ml-2 hidden text-sm font-semibold tracking-wide md:inline">
            Previous
          </span>
        </button>

        {/* Next */}
        <button
          onClick={() => handleNavigate(nextPage)}
          disabled={page >= totalPages || isPending}
          className={`group flex h-12 w-full items-center justify-center rounded-full px-8 py-3 transition-all sm:w-auto md:px-7 ${
            page >= totalPages
              ? "pointer-events-none bg-neutral-800 text-neutral-600"
              : "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700 active:scale-95"
          }`}
        >
          <span className="mr-1 text-sm font-semibold tracking-wide">
            {isPending ? "Loading..." : "Next Page"}
          </span>

          <ChevronRightIcon />
        </button>
      </div>

      {/* Status */}
      <div className="order-1 text-sm font-medium text-neutral-400 md:order-2">
        Page <span className="text-white">{page}</span>
        <span className="mx-1.5 text-neutral-600">of</span>
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
