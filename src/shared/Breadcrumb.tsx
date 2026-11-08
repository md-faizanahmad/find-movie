"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbProps {
  label?: string;
  className?: string;
}

const Breadcrumb = ({ label = "Back", className = "" }: BreadcrumbProps) => {
  const router = useRouter();

  return (
    <nav
      className={`absolute top-6 left-6 md:top-28 md:left-12 z-10 ${className}`}
      aria-label="Breadcrumb"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="cursor-pointer group flex items-center gap-2 px-5 py-2.5 bg-black/50 hover:bg-red-600 backdrop-blur-xl text-white rounded-full transition-all border border-white/20 shadow-2xl active:scale-95"
      >
        <ChevronLeft
          size={20}
          strokeWidth={2.5}
          className="transition-transform group-hover:-translate-x-0.5"
        />

        <span className="text-sm md:text-base font-bold tracking-wide">
          {label}
        </span>
      </button>
    </nav>
  );
};

export default Breadcrumb;
