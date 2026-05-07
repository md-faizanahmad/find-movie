interface Props {
  aliases?: string[];
}

export function PersonAliases({ aliases }: Props) {
  if (!aliases?.length) {
    return null;
  }

  return (
    <div className="mt-8 hidden max-w-2xl md:block">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
        Also Known As
      </p>

      <div className="flex flex-wrap gap-2">
        {aliases.slice(0, 6).map((alias) => (
          <span
            key={alias}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-md"
          >
            {alias}
          </span>
        ))}
      </div>
    </div>
  );
}
