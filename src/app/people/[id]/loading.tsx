export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="animate-pulse space-y-8">
        <div className="h-96 rounded-3xl bg-neutral-900" />

        <div className="h-10 w-64 rounded bg-neutral-900" />

        <div className="space-y-3">
          <div className="h-4 rounded bg-neutral-900" />
          <div className="h-4 rounded bg-neutral-900" />
          <div className="h-4 w-2/3 rounded bg-neutral-900" />
        </div>
      </div>
    </main>
  );
}
