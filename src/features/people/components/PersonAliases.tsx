interface Props {
  aliases?: string[];
}

export function PersonAliases({ aliases }: Props) {
  if (!aliases?.length) return null;

  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
        Also Known As
      </p>

      <p className="text-sm leading-7 text-neutral-400">
        {aliases.slice(0, 6).join(" • ")}
      </p>
    </div>
  );
}
