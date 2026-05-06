// app/people/page.tsx

import { getPopularPeople } from "@/features/people/api/getPopularPeople";

import { searchPeople } from "@/features/people/api/searchPeople";

import { PeopleEmptyState } from "@/features/people/components/PeopleEmptyState";

import { PeopleGrid } from "@/features/people/components/PeopleGrid";

import { PeopleHero } from "@/features/people/components/PeopleHero";

import { PeoplePagination } from "@/features/people/components/PeoplePagination";

interface Props {
  searchParams: Promise<{
    page?: string;

    q?: string;
  }>;
}

export default async function PeoplePage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const query = params.q || "";

  // Dynamic fetch
  const people = query
    ? await searchPeople(query, page)
    : await getPopularPeople(page);

  const hasResults = people.results.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <PeopleHero people={people.results.slice(0, 5)} />

      <section className="relative z-20 -mt-20 space-y-6 px-4 pb-20 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {query ? `Search Results for "${query}"` : "Popular People"}
            </h2>

            <p className="text-sm text-neutral-400">
              {people.total_results.toLocaleString()} people found
            </p>
          </div>
        </div>

        {/* Results */}
        {hasResults ? (
          <>
            <PeopleGrid people={people.results} />

            <PeoplePagination
              page={page}
              totalPages={people.total_pages}
              query={query}
            />
          </>
        ) : (
          <PeopleEmptyState />
        )}
      </section>
    </main>
  );
}
