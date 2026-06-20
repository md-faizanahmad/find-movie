// "use client";

// import { useState } from "react";

// interface Props {
//   biography: string;
// }

// export function PersonBiography({ biography }: Props) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (!biography) return null;

//   // Define a character limit for the "Read More" toggle
//   const charLimit = 600;
//   const isLongBio = biography.length > charLimit;

//   // Logic to determine what text to show
//   const displayedText =
//     isExpanded || !isLongBio
//       ? biography
//       : `${biography.substring(0, charLimit)}...`;

//   return (
//     <section className="space-y-4 px-1">
//       {/* Header with red accent to match movie pages */}
//       <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-4">
//         Biography
//       </h2>

//       <div className="max-w-4xl group">
//         <p className="text-base md:text-lg leading-relaxed text-neutral-300 whitespace-pre-line transition-all duration-300">
//           {displayedText}
//         </p>

//         {isLongBio && (
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="mt-4 text-red-500 font-bold text-sm uppercase tracking-widest hover:text-red-400 transition-colors flex items-center gap-1"
//           >
//             {isExpanded ? (
//               <>
//                 Show Less <ChevronUpIcon />
//               </>
//             ) : (
//               <>
//                 Read Full Bio <ChevronDownIcon />
//               </>
//             )}
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }

// // Minimal Icons for alignment
// function ChevronDownIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="3"
//       viewBox="0 0 24 24"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </svg>
//   );
// }

// function ChevronUpIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="3"
//       viewBox="0 0 24 24"
//     >
//       <path d="m18 15-6-6-6 6" />
//     </svg>
//   );
// }

///////////////////////////// New design
interface Props {
  biography: string;
}

export function PersonBiography({ biography }: Props) {
  if (!biography) return null;

  return (
    <section className="max-w-4xl">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Biography
      </h2>

      <details className="group">
        <summary className="list-none cursor-pointer">
          <div className="space-y-4">
            <p className="line-clamp-4 whitespace-pre-line leading-8 text-neutral-300 group-open:hidden">
              {biography}
            </p>

            <span className="inline-flex text-sm font-medium text-neutral-400 transition-colors hover:text-white">
              Read full biography
            </span>
          </div>
        </summary>

        <div className="mt-4 border-l border-white/10 pl-6">
          <p className="whitespace-pre-line leading-8 text-neutral-300">
            {biography}
          </p>

          <span className="mt-4 inline-flex text-sm font-medium text-neutral-400">
            Show less
          </span>
        </div>
      </details>
    </section>
  );
}
