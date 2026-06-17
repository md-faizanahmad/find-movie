// app/people/page.tsx
import { getPopularPeople } from "@/features/people/api/getPopularPeople";
import { searchPeople } from "@/features/people/api/searchPeople";

import { PeopleEmptyState } from "@/features/people/components/PeopleEmptyState";
import { PeopleFilters } from "@/features/people/components/PeopleFilters";
import { PeopleGrid } from "@/features/people/components/PeopleGrid";
import { PeopleHero } from "@/features/people/components/PeopleHero";
import { TMDBPerson } from "@/features/people/types/person.types";
import { Pagination } from "@/shared/Pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
    q?: string;
    department?: string;
    gender?: string;
  }>;
}

export default async function PeoplePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const query = params.q || "";
  const department = params.department || "";
  const gender = params.gender || "";

  // Fetch people
  const people = query
    ? await searchPeople(query, page)
    : await getPopularPeople(page);

  // Note: Local filtering for "department", only filters the current page.
  // For true global department filtering, it should be done via API params if supported.
  const filteredPeople = people.results.filter((person: TMDBPerson) => {
    const matchesDepartment = department
      ? person.known_for_department === department
      : true;

    const matchesGender = gender ? String(person.gender) === gender : true;

    return matchesDepartment && matchesGender;
  });

  const hasResults = filteredPeople.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <PeopleHero people={people.results.slice(0, 5)} />

      <section className="relative z-20 -mt-20 space-y-8 px-4 pb-20 md:px-10 lg:px-14">
        {/* Responsive Header & Filters Container */}
        <div className="flex flex-col gap-6 mt-10 md:flex-row md:items-end md:justify-between">
          {/* Left Side: Title and TOTAL Count */}
          <div className="space-y-1">
            <h5 className="text-2xl font-black uppercase tracking-tighter md:text-4xl">
              {query ? `Results for "${query}"` : "Popular People"}
            </h5>
            <p className="text-sm font-medium text-neutral-400 md:text-base">
              {/* Using people.total_results for the global count */}
              Showing{" "}
              <span className="text-red-500">
                {(people.total_results ?? 0).toLocaleString()}
              </span>{" "}
              total individuals
            </p>
          </div>

          {/* Right Side: Filters */}
          <div className="w-full md:w-auto">
            <PeopleFilters />
          </div>
        </div>

        {/* <hr className="border-white/10" /> */}

        {/* Results */}
        {hasResults ? (
          <>
            <PeopleGrid people={filteredPeople} />

            <Pagination
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
