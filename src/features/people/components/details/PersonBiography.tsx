interface Props {
  biography: string;
}

export function PersonBiography({ biography }: Props) {
  if (!biography) return null;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Biography</h2>

      <p className="max-w-4xl whitespace-pre-line leading-relaxed text-neutral-300">
        {biography}
      </p>
    </section>
  );
}
