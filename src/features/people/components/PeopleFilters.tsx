"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";

const DEPARTMENTS = ["Acting", "Directing", "Production", "Writing"];
const GENDERS = [
  { label: "Female", value: "1" },
  { label: "Male", value: "2" },
  { label: "Non-Binary", value: "3" },
];

export function PeopleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender") || "";
  const department = searchParams.get("department") || "";
  const hasFilters = gender || department;

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/people?${params.toString()}`);
  }

  function resetFilters() {
    router.push("/people?page=1");
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Department Filter */}
      <div className="w-full md:w-60">
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
          Department
        </label>
        <div className="relative">
          <select
            value={department}
            onChange={(e) => updateFilter("department", e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold uppercase tracking-widest text-white outline-none transition-all focus:border-red-600 focus:ring-1 focus:ring-red-600"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-neutral-900 text-white"
              >
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
          />
        </div>
      </div>

      {/* Gender Filter */}
      <div className="w-full md:w-60">
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
          Gender
        </label>
        <div className="relative">
          <select
            value={gender}
            onChange={(e) => updateFilter("gender", e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold uppercase tracking-widest text-white outline-none transition-all focus:border-red-600 focus:ring-1 focus:ring-red-600"
          >
            <option value="">All Genders</option>
            {GENDERS.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="bg-neutral-900 text-white"
              >
                {item.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
          />
        </div>
      </div>

      {/* Reset Button - Appears only when filter is active */}
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-red-600/20 bg-red-600/10 px-6 text-xs font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-600 hover:text-white active:scale-95 md:w-auto"
        >
          <X size={14} />
          Reset
        </button>
      )}
    </div>
  );
}
