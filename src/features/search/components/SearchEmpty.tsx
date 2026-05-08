interface Props {
  query: string;
}

export function SearchEmpty({ query }: Props) {
  return (
    <div
      className="
        flex min-h-[50vh] flex-col
        items-center justify-center
        text-center
      "
    >
      <h2 className="text-2xl font-bold text-white">No results found</h2>

      <p className="mt-3 max-w-md text-neutral-400">
        We couldn’t find anything for
        <span className="mx-1 font-medium text-white">&quot;{query}&quot;</span>
      </p>

      <p className="mt-2 text-sm text-neutral-500">
        Try searching another movie, TV show, or actor.
      </p>
    </div>
  );
}
