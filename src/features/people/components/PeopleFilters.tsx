"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  // function updateDepartment(value: string) {
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (value) {
  //     params.set("department", value);
  //   } else {
  //     params.delete("department");
  //   }

  //   params.set("page", "1");

  //   router.push(`/people?${params.toString()}`);
  // }
  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(`/people?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full md:w-55">
        <label className="mb-2 block text-sm font-medium text-white">
          Department
        </label>

        <select
          value={department}
          // onChange={(e) => updateDepartment(e.target.value)}
          onChange={(e) => updateFilter("department", e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-zinc-900
            px-4
            text-sm
            text-white
            outline-none
            transition
            focus:border-red-500
          "
        >
          <option value="">All Departments</option>

          {DEPARTMENTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-55">
        <label className="mb-2 block text-sm font-medium text-white">
          Gender
        </label>

        <select
          value={gender}
          onChange={(e) => updateFilter("gender", e.target.value)}
          className="
      h-11
      w-full
      rounded-xl
      border
      border-white/10
      bg-zinc-900
      px-4
      text-sm
      text-white
      outline-none
      transition
      focus:border-red-500
    "
        >
          <option value="">All Genders</option>

          {GENDERS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
