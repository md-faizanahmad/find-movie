// import { MovieLoadingSkeleton } from "@/features/discover/components/MovieLoadingSkeleton";

// export default function Loading() {
//   return (
//     <main className="min-h-screen bg-black px-4 py-10 text-white md:px-8 lg:px-12">
//       <div className="mb-8 space-y-3">
//         <div className="h-10 w-64 animate-pulse rounded bg-neutral-900" />

//         <div className="h-4 w-40 animate-pulse rounded bg-neutral-900" />
//       </div>

//       <MovieLoadingSkeleton />
//     </main>
//   );
// }

import { MovieLoadingSkeleton } from "@/features/discover/components/MovieLoadingSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="mb-8">
        <div className="mb-3 h-7 w-48 rounded-full skeleton-shimmer" />

        <div className="h-3 w-28 rounded-full skeleton-shimmer" />
      </div>

      <MovieLoadingSkeleton />
    </main>
  );
}
