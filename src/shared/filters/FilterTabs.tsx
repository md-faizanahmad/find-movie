"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const activeLabel =
    filters.find((f) => f.value === active)?.label || "Filters";

  return (
    <div className="relative w-full md:w-72">
      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-neutral-900 px-5 py-3 transition-all active:scale-95"
      >
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
          {activeLabel}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-red-600 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Transparent Overlay to close on click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
              {filters.map((filter) => {
                const isActive = active === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => {
                      onChange(filter.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors",
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
