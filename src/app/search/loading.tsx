import { SearchLoading } from "@/features/search/components/SearchLoading";

export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SearchLoading />
      </div>
    </main>
  );
}
