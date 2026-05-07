"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function NationalityFilter({ value, onChange, options }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white">Nationality</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11
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
        <option value="">All Nationalities</option>

        {options.map((nationality) => (
          <option key={nationality} value={nationality}>
            {nationality}
          </option>
        ))}
      </select>
    </div>
  );
}
