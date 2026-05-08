interface Props {
  message?: string;
}

export function SearchError({
  message = "Something went wrong while searching.",
}: Props) {
  return (
    <div
      className="
        flex min-h-[50vh] flex-col
        items-center justify-center
        text-center
      "
    >
      <h2 className="text-2xl font-bold text-red-500">Search Failed</h2>

      <p className="mt-3 max-w-md text-neutral-400">{message}</p>
    </div>
  );
}
