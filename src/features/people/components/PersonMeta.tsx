// import { Calendar, Flame, MapPin } from "lucide-react";

// interface CombinedCredits {
//   cast?: unknown[];
// }

// interface Person {
//   birthday: string | null;
//   deathday: string | null;
//   place_of_birth: string | null;
//   popularity: number | null;
//   combined_credits?: CombinedCredits | null;
// }

// interface Props {
//   person: Person;
// }

// function calculateAge(
//   birthday: string | null,
//   deathday: string | null,
// ): number | null {
//   if (!birthday) return null;

//   const birth = new Date(birthday);
//   const end = deathday ? new Date(deathday) : new Date();
//   let age = end.getFullYear() - birth.getFullYear();
//   const month = end.getMonth() - birth.getMonth();
//   if (month < 0 || (month === 0 && end.getDate() < birth.getDate())) {
//     age--;
//   }

//   return age;
// }

// function getCountryFlag(place: string | null): string {
//   if (!place) return "🌍";

//   const lower = place.toLowerCase();

//   if (lower.includes("india")) return "🇮🇳";
//   if (lower.includes("usa") || lower.includes("america")) return "🇺🇸";
//   if (lower.includes("uk") || lower.includes("england")) return "🇬🇧";
//   if (lower.includes("japan")) return "🇯🇵";
//   if (lower.includes("korea")) return "🇰🇷";
//   if (lower.includes("australia")) return "🇦🇺";
//   if (lower.includes("spain")) return "🇪🇸";
//   if (lower.includes("france")) return "🇫🇷";

//   return "🌍";
// }

// export function PersonMeta({ person }: Props) {
//   const age = calculateAge(person.birthday, person.deathday);
//   const flag = getCountryFlag(person.place_of_birth);
//   const knownCredits = person.combined_credits?.cast?.length ?? 0;

//   return (
//     <>
//       {/* Quick Stats */}
//       <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
//         {age && (
//           <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-md">
//             🎂 {age} years old
//           </div>
//         )}

//         {person.place_of_birth && (
//           <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-md">
//             {flag} {person.place_of_birth}
//           </div>
//         )}

//         <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-md">
//           🎬 {knownCredits} credits
//         </div>

//         <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-md">
//           <span className="inline-flex items-center gap-2">
//             <Flame className="h-4 w-4 text-orange-500" />
//             {Math.round(person.popularity ?? 0)}
//           </span>
//         </div>
//       </div>

//       {/* Detailed Meta */}
//       <div className="mt-8 grid gap-4 text-sm text-neutral-300 sm:grid-cols-2">
//         {person.birthday && (
//           <div className="flex items-center gap-3">
//             <Calendar className="h-4 w-4 text-red-500" />

//             <div>
//               <p className="text-xs uppercase tracking-widest text-neutral-500">
//                 Born
//               </p>

//               <p>{person.birthday}</p>
//             </div>
//           </div>
//         )}

//         {person.place_of_birth && (
//           <div className="flex items-center gap-3">
//             <MapPin className="h-4 w-4 text-red-500" />

//             <div>
//               <p className="text-xs uppercase tracking-widest text-neutral-500">
//                 Origin
//               </p>

//               <p>{person.place_of_birth}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
//////////////////////////////////////// new design
import { Calendar, Film, MapPin } from "lucide-react";

interface CombinedCredits {
  cast?: unknown[];
}

interface Person {
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  combined_credits?: CombinedCredits | null;
}

interface Props {
  person: Person;
}

function calculateAge(
  birthday: string | null,
  deathday: string | null,
): number | null {
  if (!birthday) return null;

  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();

  let age = end.getFullYear() - birth.getFullYear();

  const month = end.getMonth() - birth.getMonth();

  if (month < 0 || (month === 0 && end.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function PersonMeta({ person }: Props) {
  const age = calculateAge(person.birthday, person.deathday);
  const knownCredits = person.combined_credits?.cast?.length ?? 0;

  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-3">
      {person.birthday && (
        <div>
          <div className="mb-3 flex items-center gap-2 text-neutral-500">
            <Calendar className="h-4 w-4" />

            <span className="text-xs uppercase tracking-[0.25em]">Born</span>
          </div>

          <p className="text-base text-white">{formatDate(person.birthday)}</p>

          {age && (
            <p className="mt-1 text-sm text-neutral-400">{age} years old</p>
          )}
        </div>
      )}

      {person.place_of_birth && (
        <div>
          <div className="mb-3 flex items-center gap-2 text-neutral-500">
            <MapPin className="h-4 w-4" />

            <span className="text-xs uppercase tracking-[0.25em]">
              Place of Birth
            </span>
          </div>

          <p className="text-base text-white">{person.place_of_birth}</p>
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center gap-2 text-neutral-500">
          <Film className="h-4 w-4" />

          <span className="text-xs uppercase tracking-[0.25em]">Credits</span>
        </div>

        <p className="text-base text-white">{knownCredits}</p>

        <p className="mt-1 text-sm text-neutral-400">Known appearances</p>
      </div>
    </div>
  );
}
