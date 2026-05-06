"use client";

export default function Error({ error }: { error: Error }) {
  console.error(error);

  return <div className="p-6 text-red-500">Failed to load movie details.</div>;
}
