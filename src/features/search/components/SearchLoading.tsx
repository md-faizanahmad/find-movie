export function SearchLoading() {
  return (
    <div
      className="
        grid grid-cols-2 gap-4
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      "
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="
            animate-pulse overflow-hidden rounded-2xl
            border border-white/5
            bg-neutral-900/40
          "
        >
          <div className="aspect-2/3 bg-neutral-800" />

          <div className="space-y-2 p-3">
            <div className="h-4 rounded bg-neutral-700" />

            <div className="h-3 w-2/3 rounded bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
