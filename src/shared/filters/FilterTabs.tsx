"use client";

import { cn } from "@/lib/utils/cn";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterTabsProps {
  filters: FilterOption[];

  active: string;

  onChange: (value: string) => void;
}

export function FilterTabs({ filters, active, onChange }: FilterTabsProps) {
  return (
    <div className="w-full border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="no-scrollbar flex items-center gap-6 overflow-x-auto py-1">
          {filters.map((filter) => {
            const isActive = active === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className="group relative whitespace-nowrap py-4 text-sm font-medium"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-white"
                      : "text-text-secondary group-hover:text-white",
                  )}
                >
                  {filter.label}
                </span>

                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all",
                    isActive
                      ? "bg-brand-primary"
                      : "bg-transparent group-hover:bg-zinc-700",
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
