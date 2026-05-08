"use client";

import { SearchError } from "@/features/search/components/SearchError";

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SearchError />
      </div>
    </main>
  );
}
