import Link from "next/link";

const REGIONS = [
  { label: "Hollywood", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "K-Drama", value: "ko" },
  { label: "Japanese", value: "ja" },
  { label: "Spanish", value: "es" },
];

export function TVRegionFilter() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {REGIONS.map((region) => (
        <Link
          key={region.value}
          href={`/tv-shows?language=${region.value}`}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-red-600"
        >
          {region.label}
        </Link>
      ))}
    </div>
  );
}
