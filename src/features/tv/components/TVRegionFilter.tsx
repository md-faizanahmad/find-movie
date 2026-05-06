"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils/cn";

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
  const searchParams = useSearchParams();

  const activeLanguage = searchParams.get("language") || "en";

  return (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
      <div className="flex min-w-max items-center gap-2 pb-2 md:gap-3">
        {REGIONS.map((region) => {
          const isActive = activeLanguage === region.value;

          return (
            <Link
              key={region.value}
              href={`/tv-shows?language=${region.value}`}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300 md:px-4 md:text-sm",

                isActive
                  ? "border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                  : "border-white/10 bg-white/5 text-neutral-300 hover:border-red-600/40 hover:bg-red-600 hover:text-white",
              )}
            >
              {region.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
