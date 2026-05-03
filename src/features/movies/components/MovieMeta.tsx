interface Props {
  runtime: number | null;
  release_date: string | null;
  vote_average: number | null;
}

export function MovieMeta({ runtime, release_date, vote_average }: Props) {
  // Extract year safely
  const year = release_date ? release_date.split("-")[0] : "N/A";

  // Format runtime to hours and minutes (optional but looks more professional)
  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="px-8 pb-8 flex items-center gap-6 text-sm font-medium text-gray-400">
      {/* Runtime */}
      <div className="flex items-center gap-1.5">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{formatRuntime(runtime)}</span>
      </div>

      {/* Release Year */}
      <span>{year}</span>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="text-white">
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </span>
        <span className="text-gray-500">/ 10</span>
      </div>
    </div>
  );
}
