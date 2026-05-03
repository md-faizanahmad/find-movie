interface Props {
  runtime: number;
  release_date: string;
  vote_average: number;
}

export function MovieMeta({ runtime, release_date, vote_average }: Props) {
  const year = release_date ? new Date(release_date).getFullYear() : "N/A";

  return (
    <div className="px-8 pb-8 flex gap-6 text-sm text-gray-400">
      <span>{runtime ? `${runtime} min` : "N/A"}</span>
      <span>{year}</span>
      <span>⭐ {vote_average?.toFixed(1) || "N/A"}</span>
    </div>
  );
}
