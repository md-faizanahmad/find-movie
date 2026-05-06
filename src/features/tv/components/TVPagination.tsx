import Link from "next/link";

interface Props {
  currentPage: number;

  totalPages: number;

  language: string;
}

export function TVPagination({ currentPage, totalPages, language }: Props) {
  return (
    <div className="flex justify-center gap-4 pt-10">
      {currentPage > 1 && (
        <Link
          href={`/tv-shows?language=${language}&page=${currentPage - 1}`}
          className="rounded-xl bg-neutral-900 px-5 py-3"
        >
          Previous
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={`/tv-shows?language=${language}&page=${currentPage + 1}`}
          className="rounded-xl bg-red-600 px-5 py-3"
        >
          Next
        </Link>
      )}
    </div>
  );
}
