// import Image from "next/image";
// import {
//   Star,
//   Clock,
//   Calendar,
//   Globe,
//   Zap,
//   Activity,
//   Info,
// } from "lucide-react";
// import { WatchProviderGroups } from "@/@types/watch-provider.types";
// import { WatchProviders } from "@/components/WatchProviders";

// interface Props {
//   title: string;
//   tagline?: string | null;
//   poster_path: string | null;
//   overview: string;
//   genres: string[];
//   runtime: number;
//   release_date: string;
//   vote_average: number;
//   status?: string;
//   original_language?: string;
//   popularity?: number;

//   watchProviders: WatchProviderGroups | null;
// }

// const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
// const BLUR_DATA =
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// export function MovieInfo({
//   title,
//   tagline,
//   poster_path,
//   overview,
//   genres,
//   runtime,
//   release_date,
//   vote_average,
//   status,
//   original_language,
//   popularity,
//   watchProviders,
// }: Props) {
//   return (
//     <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-6 md:p-12 bg-black text-white rounded-3xl border border-white/5 shadow-2xl">
//       {/* Left Column: Poster & Quick Stats */}
//       <div className="mx-auto lg:mx-0 w-full max-w-[320px] lg:max-w-95 shrink-0 space-y-6">
//         {poster_path && (
//           <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
//             <Image
//               src={`${POSTER_BASE}${poster_path}`}
//               alt={title}
//               fill
//               className="object-cover"
//               placeholder="blur"
//               blurDataURL={BLUR_DATA}
//               sizes="(max-width: 768px) 100vw, 380px"
//             />
//           </div>
//         )}

//         {/* Popularity Card - Mobile First Highlight */}
//         {popularity && (
//           <div className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 p-4 border border-white/5 transition-colors hover:bg-red-600/5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
//                   Trend Score
//                 </p>
//                 <p className="text-2xl font-black italic tracking-tighter text-white">
//                   {Math.round(popularity).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-600">
//                 <Zap size={24} className="fill-current" />
//               </div>
//             </div>
//             {/* Simple visual bar for popularity impact */}
//             <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
//               <div className="h-full bg-red-600 w-[75%]" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right Column: Detailed Info */}
//       <div className="flex-1 space-y-10">
//         <div className="space-y-4">
//           <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] italic">
//             {title}
//           </h1>

//           {tagline && (
//             <p className="text-red-600 font-bold text-lg md:text-2xl italic tracking-tight">
//               &ldquo;{tagline}&rdquo;
//             </p>
//           )}

//           {/* Core Row: Rating, Time, Year */}
//           <div className="flex flex-wrap gap-4 pt-4">
//             <CoreBadge
//               icon={
//                 <Star className="fill-yellow-500 text-yellow-500" size={16} />
//               }
//               value={`${vote_average.toFixed(1)}`}
//             />
//             <CoreBadge
//               icon={<Clock size={16} className="text-neutral-400" />}
//               value={`${runtime} min`}
//             />
//             <CoreBadge
//               icon={<Calendar size={16} className="text-neutral-400" />}
//               value={new Date(release_date).getFullYear().toString()}
//             />
//           </div>
//         </div>

//         {/* Technical Specs Row: Status & Language */}
//         <div className="flex flex-wrap gap-6 py-6 border-y border-white/5">
//           <Spec
//             icon={<Activity size={14} />}
//             label="Production Status"
//             value={status || "Released"}
//           />
//           <Spec
//             icon={<Globe size={14} />}
//             label="Original Language"
//             value={original_language?.toUpperCase() || "EN"}
//           />
//           <Spec
//             icon={<Info size={14} />}
//             label="Release Date"
//             value={new Date(release_date).toLocaleDateString()}
//           />
//         </div>

//         {/* Overview */}
//         <div className="space-y-4">
//           <h2 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
//             Overview
//           </h2>
//           <p className="text-neutral-400 leading-relaxed text-base md:text-xl font-light tracking-wide italic">
//             {overview || "Plot summary coming soon."}
//           </p>
//         </div>

//         {/* Genres */}
//         <div className="space-y-4 pt-4">
//           <div className="flex flex-wrap gap-2">
//             {genres.map((name) => (
//               <span
//                 key={name}
//                 className="px-4 py-2 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-default"
//               >
//                 {name}
//               </span>
//             ))}
//           </div>
//         </div>
//         {watchProviders && (
//           <div className="pt-6">
//             <WatchProviders providers={watchProviders} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// function CoreBadge({ icon, value }: { icon: React.ReactNode; value: string }) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/5">
//       {icon}
//       <span className="text-sm font-black italic uppercase">{value}</span>
//     </div>
//   );
// }

// function Spec({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="text-neutral-600">{icon}</div>
//       <div>
//         <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest mb-0.5">
//           {label}
//         </p>
//         <p className="text-xs font-black uppercase text-white">{value}</p>
//       </div>
//     </div>
//   );
// }

//////////////// Design Update
"use client";

import Image from "next/image";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Zap,
  Activity,
  Info,
} from "lucide-react";
import { WatchProviderGroups } from "@/@types/watch-provider.types";
import { WatchProviders } from "@/components/WatchProviders";

interface Props {
  title: string;
  tagline?: string | null;
  poster_path: string | null;
  overview: string;
  genres: string[];
  runtime: number;
  release_date: string;
  vote_average: number;
  status?: string;
  original_language?: string;
  popularity?: number;
  watchProviders: WatchProviderGroups | null;
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BLUR_DATA =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function MovieInfo({
  title,
  tagline,
  poster_path,
  overview,
  genres,
  runtime,
  release_date,
  vote_average,
  status,
  original_language,
  popularity,
  watchProviders,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl p-4 md:p-8 lg:p-10 bg-black text-white rounded-2xl border border-white/5 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Left Column: Poster & Quick Stats */}
      <div className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] mx-auto lg:mx-0 shrink-0 space-y-4">
        {poster_path && (
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20">
            <Image
              src={`${POSTER_BASE}${poster_path}`}
              alt={title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA}
              sizes="(max-width: 1024px) 300px, 320px"
              priority
            />
          </div>
        )}

        {/* Popularity Card - Compact Highlight */}
        {popularity && (
          <div className="group relative overflow-hidden rounded-xl bg-zinc-900/40 p-3 border border-white/5 transition-all hover:bg-zinc-900/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">
                  Trend Score
                </p>
                <p className="text-xl font-black italic tracking-tight text-white">
                  {Math.round(popularity).toLocaleString()}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/10 text-red-500">
                <Zap size={18} className="fill-current" />
              </div>
            </div>
            {/* Simple visual bar for popularity impact */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full bg-red-600 w-[75%]" />
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Detailed Info */}
      <div className="flex-1 w-full space-y-6">
        <div className="space-y-2.5">
          {/* Dynamic Balanced Title Size */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[1.05] italic text-white">
            {title}
          </h1>

          {tagline && (
            <p className="text-red-500 font-bold text-sm sm:text-base italic tracking-tight">
              &ldquo;{tagline}&rdquo;
            </p>
          )}

          {/* Core Row: Rating, Time, Year */}
          <div className="flex flex-wrap gap-2 pt-2">
            <CoreBadge
              icon={
                <Star className="fill-yellow-500 text-yellow-500" size={13} />
              }
              value={`${vote_average.toFixed(1)}`}
            />
            <CoreBadge
              icon={<Clock size={13} className="text-zinc-400" />}
              value={`${runtime} min`}
            />
            <CoreBadge
              icon={<Calendar size={13} className="text-zinc-400" />}
              value={new Date(release_date).getFullYear().toString()}
            />
          </div>
        </div>

        {/* Technical Specs Row: Status & Language */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-3 py-4 border-y border-white/5">
          <Spec
            icon={<Activity size={13} />}
            label="Status"
            value={status || "Released"}
          />
          <Spec
            icon={<Globe size={13} />}
            label="Language"
            value={original_language?.toUpperCase() || "EN"}
          />
          <Spec
            icon={<Info size={13} />}
            label="Release Date"
            value={new Date(release_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          />
        </div>

        {/* Overview Container */}
        <div className="space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Overview
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-normal tracking-wide">
            {overview || "Plot summary coming soon."}
          </p>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {genres.map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>

        {watchProviders && (
          <div className="pt-4 border-t border-white/5">
            <WatchProviders providers={watchProviders} />
          </div>
        )}
      </div>
    </section>
  );
}

function CoreBadge({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/5">
      {icon}
      <span className="text-xs font-black italic uppercase text-zinc-200">
        {value}
      </span>
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 min-w-[140px]">
      <div className="text-zinc-500 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">
          {label}
        </p>
        <p className="text-xs font-black uppercase text-zinc-200 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
