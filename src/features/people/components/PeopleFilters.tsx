// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { ChevronDown, X } from "lucide-react";

// const DEPARTMENTS = ["Acting", "Directing", "Production", "Writing"];
// const GENDERS = [
//   { label: "Female", value: "1" },
//   { label: "Male", value: "2" },
//   { label: "Non-Binary", value: "3" },
// ];

// export function PeopleFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const gender = searchParams.get("gender") || "";
//   const department = searchParams.get("department") || "";
//   const hasFilters = gender || department;

//   function updateFilter(key: string, value: string) {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value) params.set(key, value);
//     else params.delete(key);
//     params.set("page", "1");
//     router.push(`/people?${params.toString()}`);
//   }

//   function resetFilters() {
//     router.push("/people?page=1");
//   }

//   return (
//     <div className="flex flex-col gap-6 md:flex-row md:items-end">
//       {/* Department Filter */}
//       <div className="w-full md:w-50">
//         <label className="mb-2 block text-[10px] font-black uppercase  tracking-widest text-neutral-500 sr-only">
//           Department
//         </label>
//         <div className="relative">
//           <select
//             value={department}
//             onChange={(e) => updateFilter("department", e.target.value)}
//             className="h-12 w-full appearance-none cursor-pointer rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold uppercase tracking-widest text-white outline-none transition-all focus:border-red-600 focus:ring-1 focus:ring-red-600"
//           >
//             <option value="">All Departments</option>
//             {DEPARTMENTS.map((item) => (
//               <option
//                 key={item}
//                 value={item}
//                 className="bg-neutral-900 text-white cursor-pointer"
//               >
//                 {item}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             size={16}
//             className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
//           />
//         </div>
//       </div>

//       {/* Gender Filter */}
//       <div className="w-full md:w-50">
//         <label className="mb-2 block text-[10px]  font-black uppercase tracking-widest text-neutral-500 sr-only">
//           Gender
//         </label>
//         <div className="relative">
//           <select
//             value={gender}
//             onChange={(e) => updateFilter("gender", e.target.value)}
//             className="h-12 w-full appearance-none cursor-pointer rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm font-bold uppercase tracking-widest text-white outline-none transition-all focus:border-red-600 focus:ring-1 focus:ring-red-600"
//           >
//             <option value="">All Genders</option>
//             {GENDERS.map((item) => (
//               <option
//                 key={item.value}
//                 value={item.value}
//                 className="bg-neutral-900 text-white cursor-pointer"
//               >
//                 {item.label}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             size={16}
//             className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
//           />
//         </div>
//       </div>

//       {/* Reset Button - Appears only when filter is active */}
//       {hasFilters && (
//         <button
//           onClick={resetFilters}
//           className="flex h-12 items-center cursor-pointer justify-center gap-2 rounded-xl border border-red-600/20 bg-red-600/10 px-6 text-xs font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-600 hover:text-white active:scale-95 md:w-auto"
//         >
//           <X size={14} />
//           Reset
//         </button>
//       )}
//     </div>
//   );
// }

//////////////////
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X, Check } from "lucide-react";

const DEPARTMENTS = ["Acting", "Directing", "Production", "Writing"];
const GENDERS = [
  { label: "Female", value: "1" },
  { label: "Male", value: "2" },
  { label: "Non-Binary", value: "3" },
];

export function PeopleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Custom Dropdown Open States
  const [openDropdown, setOpenDropdown] = useState<"dept" | "gender" | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const genderValue = searchParams.get("gender") || "";
  const departmentValue = searchParams.get("department") || "";
  const hasFilters = !!(genderValue || departmentValue);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/people?${params.toString()}`);
    setOpenDropdown(null); // Close dropdown after selection
  }

  function resetFilters() {
    router.push("/people?page=1");
    setOpenDropdown(null);
  }

  const selectedGenderLabel =
    GENDERS.find((g) => g.value === genderValue)?.label || "All Genders";
  const selectedDeptLabel = departmentValue || "All Departments";

  return (
    <div
      ref={containerRef}
      className="flex flex-row items-center gap-4 w-full max-md:flex-col max-md:items-stretch max-md:gap-3"
    >
      {/* Department Filter */}
      <div className="relative w-52 max-md:w-full">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "dept" ? null : "dept")
          }
          className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-xs font-bold uppercase tracking-widest transition-all outline-none
            ${
              openDropdown === "dept"
                ? "border-red-600 bg-neutral-900 text-white ring-1 ring-red-600"
                : "border-white/10 bg-neutral-900/60 text-neutral-300 hover:border-white/20"
            }`}
        >
          <span className="truncate">{selectedDeptLabel}</span>
          <ChevronDown
            size={16}
            className={`text-red-500 transition-transform duration-200 ${openDropdown === "dept" ? "rotate-180" : ""}`}
          />
        </button>

        {openDropdown === "dept" && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-neutral-950 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
            <button
              onClick={() => updateFilter("department", "")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
                ${!departmentValue ? "bg-red-600/10 text-red-400" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
            >
              All Departments
              {!departmentValue && <Check size={14} />}
            </button>
            {DEPARTMENTS.map((item) => (
              <button
                key={item}
                onClick={() => updateFilter("department", item)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
                  ${departmentValue === item ? "bg-red-600/10 text-red-400" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
              >
                {item}
                {departmentValue === item && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="relative w-52 max-md:w-full">
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "gender" ? null : "gender")
          }
          className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-xs font-bold uppercase tracking-widest transition-all outline-none
            ${
              openDropdown === "gender"
                ? "border-red-600 bg-neutral-900 text-white ring-1 ring-red-600"
                : "border-white/10 bg-neutral-900/60 text-neutral-300 hover:border-white/20"
            }`}
        >
          <span className="truncate">{selectedGenderLabel}</span>
          <ChevronDown
            size={16}
            className={`text-red-500 transition-transform duration-200 ${openDropdown === "gender" ? "rotate-180" : ""}`}
          />
        </button>

        {openDropdown === "gender" && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-neutral-950 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
            <button
              onClick={() => updateFilter("gender", "")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
                ${!genderValue ? "bg-red-600/10 text-red-400" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
            >
              All Genders
              {!genderValue && <Check size={14} />}
            </button>
            {GENDERS.map((item) => (
              <button
                key={item.value}
                onClick={() => updateFilter("gender", item.value)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
                  ${genderValue === item.value ? "bg-red-600/10 text-red-400" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}
              >
                {item.label}
                {genderValue === item.value && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-red-600/20 bg-red-600/10 px-5 text-xs font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-600 hover:text-white active:scale-95 max-md:w-full"
        >
          <X size={14} />
          Reset
        </button>
      )}
    </div>
  );
}
