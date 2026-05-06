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

  return (
    <footer className="mt-10 flex justify-center border-t border-white/5 pt-8">
      <div className="flex gap-4">
        {page > 1 && (
          <Link
            href={buildUrl(page - 1)}
            className="rounded-xl bg-neutral-900 px-5 py-3"
          >
            Previous
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={buildUrl(page + 1)}
            className="rounded-xl bg-red-600 px-5 py-3"
          >
            Next
          </Link>
        )}
      </div>
    </footer>
  );
}
