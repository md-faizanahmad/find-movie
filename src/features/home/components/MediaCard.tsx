///////////////// With Adult Content Modal
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Star, PlayCircle } from "lucide-react";
// import { useState } from "react";
// import { Media } from "../services/home.service";
// import { AdultVerificationModal } from "@/components/adult/AdultVerificationModal";
// import { isAdultContent } from "@/lib/isAdultContent";
// import { useMemo } from "react";
// interface MediaCardProps {
//   item: Media;
// }

// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// export function MediaCard({ item }: MediaCardProps) {
//   const [adultUnlocked, setAdultUnlocked] = useState(() => {
//     if (typeof window === "undefined") {
//       return false;
//     }

//     return localStorage.getItem("adult-unlocked") === "true";
//   });

//   const [showVerification, setShowVerification] = useState(false);

//   const imageUrl = item.poster ? `${IMAGE_BASE_URL}/w500${item.poster}` : null;

//   const year = item.releaseDate
//     ? new Date(item.releaseDate).getFullYear()
//     : "TBD";

//   // const isAdult = isAdultContent(item);
//   const isAdult = useMemo(() => isAdultContent(item), [item]);

//   const isLocked = isAdult && !adultUnlocked;

//   const CardContent = (
//     <>
//       {/* Poster */}
//       <div className="relative aspect-[2/3]  w-full overflow-hidden rounded-xl bg-neutral-900 ring-offset-black transition-all duration-500 group-hover:ring-2 group-hover:ring-red-600/80 group-hover:ring-offset-2 md:group-hover:ring-offset-4">
//         {imageUrl ? (
//           <Image
//             src={imageUrl}
//             alt={item.title}
//             fill
//             loading="lazy"
//             sizes="
//               (max-width: 640px) 50vw,
//               (max-width: 768px) 33vw,
//               (max-width: 1024px) 25vw,
//               16vw
//             "
//             className={`object-cover transition-all duration-700 ease-out ${
//               !isLocked
//                 ? "group-hover:scale-105 group-hover:brightness-50 origin-center"
//                 : ""
//             } ${isLocked ? "scale-110 blur-2xl brightness-50 " : ""}`}
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-neutral-700">
//             <PlayCircle size={42} strokeWidth={1} />
//           </div>
//         )}

//         {/* Rating */}
//         <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/50 px-1.5 py-0.5 backdrop-blur-md md:px-2 md:py-1">
//           <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

//           <span className="text-[9px] font-bold text-white md:text-xs">
//             {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
//           </span>
//         </div>

//         {/* Hover Play */}
//         {!isLocked && (
//           <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//             <PlayCircle className="text-white drop-shadow-2xl" size={44} />
//           </div>
//         )}

//         {/* Adult Overlay */}
//         {isLocked && (
//           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
//             <div className="mb-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
//               18+
//             </div>

//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowVerification(true);
//               }}
//               className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105 origin-center"
//             >
//               Unlock Content
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="mt-2.5 space-y-1 px-0.5 sm:mt-3">
//         {isLocked ? (
//           <>
//             <div className="h-4 w-24 rounded bg-neutral-800" />

//             <div className="flex items-center gap-2">
//               <div className="h-3 w-10 rounded bg-neutral-900" />

//               <div className="h-1 w-1 rounded-full bg-neutral-800" />

//               <div className="h-3 w-12 rounded bg-neutral-900" />
//             </div>
//           </>
//         ) : (
//           <>
//             <h3 className="line-clamp-1 text-[11px] font-bold text-neutral-200 transition-colors group-hover:text-red-500 sm:text-xs md:text-sm lg:text-base">
//               {item.title}
//             </h3>

//             <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500 md:gap-2 md:text-xs">
//               <span>{year}</span>

//               <span className="h-1 w-1 rounded-full bg-neutral-800" />

//               <span className="uppercase tracking-widest">
//                 {item.mediaType}
//               </span>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Verification Modal */}
//       <AdultVerificationModal
//         open={showVerification}
//         onClose={() => setShowVerification(false)}
//         onSuccess={() => setAdultUnlocked(true)}
//       />
//     </>
//   );

//   if (isLocked) {
//     return (
//       <div className="group block w-full min-w-0 outline-none">
//         {CardContent}
//       </div>
//     );
//   }

//   return (
//     <Link
//       href={`/${item.mediaType}/${item.id}`}
//       className="group block w-full min-w-0 outline-none"
//     >
//       {CardContent}
//     </Link>
//   );
// }

/// this with real auth

"use client";

import Link from "next/link";

import Image from "next/image";

import { Star } from "lucide-react";

import { useState } from "react";

import { Media } from "../services/home.service";

import { isAdultContent } from "@/lib/isAdultContent";
import { useAuthModal } from "@/context/auth-modal.context";

interface MediaCardProps {
  item: Media;

  isAuthenticated?: boolean;
}

export function MediaCard({
  item,

  isAuthenticated = false,
}: MediaCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Global auth modal.
   */
  const authModal = useAuthModal();

  /**
   * Lock adult content
   * for guests only.
   */
  const isLocked = isAdultContent(item) && !isAuthenticated;

  /**
   * Dynamic detail route.
   */
  const href = `/${item.mediaType}/${item.id}`;

  /**
   * Shared card content.
   */
  const CardContent = (
    <>
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
        <Image
          src={
            item.poster
              ? `https://image.tmdb.org/t/p/w500${item.poster}`
              : "/placeholder.jpg"
          }
          alt={item.title}
          fill
          sizes="
            (max-width: 640px) 45vw,
            (max-width: 1024px) 25vw,
            16vw
          "
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-neutral-800" />
        )}
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />

      {/* Rating */}
      <div className="absolute left-3 top-3 z-10">
        <div className="flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 backdrop-blur-md">
          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

          <span className="text-[9px] font-bold text-white md:text-xs">
            {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <h3 className="line-clamp-1 text-sm font-black text-white md:text-base">
          {item.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300">
          {item.releaseDate &&
          !Number.isNaN(new Date(item.releaseDate).getTime())
            ? new Date(item.releaseDate).getFullYear()
            : "Upcoming"}
        </p>
      </div>

      {/* Adult Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 px-6 text-center backdrop-blur-md">
          {/* Badge */}
          <div className="mb-4 rounded-full border border-red-500/30 bg-red-600/20 px-4 py-1 text-[10px] font-black tracking-[0.25em] text-red-500">
            18+ MATURE
          </div>

          {/* Title */}
          <h3 className="max-w-xs text-xl font-black text-white">
            Login to Explore Mature Content
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-300">
            This title may include mature themes, violence, or adult content
            intended for audiences aged 18 and above.
          </p>

          {/* CTA */}
          <button
            onClick={() => authModal.openModal()}
            className="mt-6 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.03] hover:bg-red-500 active:scale-[0.98]"
          >
            Login to Continue
          </button>
        </div>
      )}
    </>
  );

  /**
   * Locked content:
   * no navigation.
   */
  if (isLocked) {
    return (
      <div className="group relative block overflow-hidden rounded-3xl">
        {CardContent}
      </div>
    );
  }

  /**
   * Unlocked content:
   * navigable link.
   */
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl"
    >
      {CardContent}
    </Link>
  );
}
