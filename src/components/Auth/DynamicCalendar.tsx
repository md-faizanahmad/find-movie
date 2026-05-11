"use client";

import { cn } from "@/lib/utils/cn";

interface CalendarProps {
  selectedYear: string;
  onChange: (year: string) => void;
}

export function DynamicCalendar({ selectedYear, onChange }: CalendarProps) {
  // Logic: Only show years that make the user 18+
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 18;
  const years = Array.from({ length: 80 }, (_, i) => (maxYear - i).toString());

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
        Birth Year (+18 Required)
      </label>
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold text-white outline-none focus:border-red-600 transition-all"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600 font-bold">
          ↓
        </div>
      </div>
    </div>
  );
}
