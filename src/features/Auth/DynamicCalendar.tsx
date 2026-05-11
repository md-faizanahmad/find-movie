"use client";

import { useState } from "react";

export function DynamicCalendar() {
  const currentYear = new Date().getFullYear();

  const maxYear = currentYear - 18;

  const years = Array.from({ length: 80 }, (_, index) =>
    (maxYear - index).toString(),
  );

  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
        Birth Year (+18 Required)
      </label>

      <div className="relative">
        <select
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold text-white outline-none transition-all focus:border-red-600"
        >
          <option value="">Select Year</option>

          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <input type="hidden" name="birthYear" value={selectedYear} />

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-bold text-red-600">
          ↓
        </div>
      </div>
    </div>
  );
}
