// features/people/components/PeoplePagination.tsx

import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
}

export function PeoplePagination({ page, totalPages }: Props) {
  return (
    <footer className="mt-10 flex justify-center border-t border-white/5 pt-8">
      <div className="flex gap-4">
        {page > 1 && (
          <Link
            href={`/people?page=${page - 1}`}
            className="rounded-xl bg-neutral-900 px-5 py-3"
          >
            Previous
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={`/people?page=${page + 1}`}
            className="rounded-xl bg-red-600 px-5 py-3"
          >
            Next
          </Link>
        )}
      </div>
    </footer>
  );
}
