// export function MovieLoadingSkeleton() {
//   return (
//     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//       {Array.from({ length: 12 }).map((_, index) => (
//         <div key={index} className="animate-pulse">
//           <div className="aspect-2/3 rounded-xl bg-neutral-900" />

//           <div className="mt-3 space-y-2">
//             <div className="h-4 w-3/4 rounded bg-neutral-900" />

//             <div className="h-3 w-1/2 rounded bg-neutral-900" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

export function MovieLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/5 bg-neutral-950"
        >
          <div className="relative aspect-2/3 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>

          <div className="space-y-3 p-3">
            <div className="h-4 w-[85%] rounded-full skeleton-shimmer" />

            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded-full skeleton-shimmer" />
              <div className="h-3 w-10 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
