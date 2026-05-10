"use client";

const PEOPLE_FILTERS = [
  {
    label: "All Celebrities",
    value: "",
  },

  {
    label: "Female",
    value: "1",
  },

  {
    label: "Male",
    value: "2",
  },

  {
    label: "Non-Binary",
    value: "3",
  },
];

export function PeopleGenderDropdown() {
  return (
    <div className="relative w-full sm:w-auto">
      <select
        className="
          w-full
          appearance-none
          rounded-2xl
          border
          border-white/10
          bg-neutral-900/90
          px-4
          py-3
          pr-10
          text-sm
          font-medium
          text-white
          outline-none
          transition-all
          backdrop-blur-xl
          hover:border-white/20
          focus:border-pink-500
        "
        defaultValue=""
      >
        {PEOPLE_FILTERS.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
