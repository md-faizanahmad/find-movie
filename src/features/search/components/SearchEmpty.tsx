interface Props {
  query: string;
}

export function SearchEmpty({ query }: Props) {
  return (
    <div
      className="
        absolute top-full z-50 mt-3
        w-full rounded-2xl
        border border-white/10
        bg-neutral-950/95
        p-8 text-center
        backdrop-blur-xl
      "
    >
      <p className="text-sm font-medium text-neutral-300">No results found</p>

      <p className="mt-2 text-sm text-neutral-500">
        Try searching for another movie, TV show, or actor.
      </p>

      <p className="mt-4 truncate text-xs text-neutral-600">
        &quot;{query}&quot;
      </p>
    </div>
  );
}
