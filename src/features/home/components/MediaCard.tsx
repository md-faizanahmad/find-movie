// "use client";

// import Image from "next/image";

// import Link from "next/link";

// import { Star, PlayCircle } from "lucide-react";

// import { Media } from "../services/home.service";

// import { isAdultContent } from "@/lib/isAdultContent";

// import { useAuthModal } from "@/context/auth-modal.context";

// interface MediaCardProps {
//   item: Media;

//   isAuthenticated?: boolean;
// }

// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// export function MediaCard({ item, isAuthenticated = false }: MediaCardProps) {
//   const authModal = useAuthModal();

//   /**
//    * Lock adult content
//    * only for guests.
//    */
//   const isLocked = isAdultContent(item) && !isAuthenticated;

//   const imageUrl = item.poster ? `${IMAGE_BASE_URL}/w500${item.poster}` : null;

//   const year = item.releaseDate
//     ? new Date(item.releaseDate).getFullYear()
//     : "TBD";

//   return (
//     <div className="group relative block w-full min-w-0 overflow-hidden rounded-xl">
//       {/* Locked Overlay */}
//       {isLocked && (
//         <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 px-4 text-center backdrop-blur-sm">
//           <div className="mb-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
//             18+
//           </div>

//           <p className="mb-4 text-sm font-semibold text-white">
//             Login to Explore Mature Content
//           </p>

//           <button
//             onClick={() => authModal.openModal()}
//             className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
//           >
//             Login to Continue
//           </button>
//         </div>
//       )}

//       <Link
//         href={`/${item.mediaType}/${item.id}`}
//         className={`block ${isLocked ? "pointer-events-none" : ""}`}
//       >
//         {/* Poster */}
//         <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-neutral-900 ring-offset-black transition-all duration-500 group-hover:ring-2 group-hover:ring-red-600/80 group-hover:ring-offset-2 md:group-hover:ring-offset-4">
//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={item.title}
//               fill
//               loading="lazy"
//               sizes="
//                 (max-width: 640px) 50vw,
//                 (max-width: 768px) 33vw,
//                 (max-width: 1024px) 25vw,
//                 16vw
//               "
//               className="
//                 origin-center object-cover
//                 transition-all duration-700 ease-out
//                 group-hover:scale-105
//                 group-hover:brightness-50
//               "
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center text-neutral-700">
//               <PlayCircle size={42} strokeWidth={1} />
//             </div>
//           )}

//           {/* Rating */}
//           <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/50 px-1.5 py-0.5 backdrop-blur-md md:px-2 md:py-1">
//             <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 md:h-3 md:w-3" />

//             <span className="text-[9px] font-bold text-white md:text-xs">
//               {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
//             </span>
//           </div>
//         </div>

//         {/* Title */}
//         <h3 className="line-clamp-1 text-[11px] font-bold text-neutral-200 transition-colors group-hover:text-red-500 sm:text-xs md:text-sm lg:text-base">
//           {item.title}
//         </h3>

//         {/* Meta */}
//         <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500 md:gap-2 md:text-xs">
//           <span>{year}</span>

//           <span className="h-1 w-1 rounded-full bg-neutral-800" />

//           <span className="uppercase tracking-widest">{item.mediaType}</span>
//         </div>
//       </Link>
//     </div>
//   );
// }

////////// Above Working Fine , just we fixing ui
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, PlayCircle } from "lucide-react";
import { Media } from "../services/home.service";
import { isAdultContent } from "@/lib/isAdultContent";
import { useAuthModal } from "@/context/auth-modal.context";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

interface MediaCardProps {
  item: Media;
  isAuthenticated?: boolean;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/p/t/p";

export function MediaCard({ item, isAuthenticated = false }: MediaCardProps) {
  const authModal = useAuthModal();
  const isLocked = isAdultContent(item) && !isAuthenticated;
  const imageUrl = item.poster ? `${IMAGE_BASE_URL}/w500${item.poster}` : null;
  const year = item.releaseDate
    ? new Date(item.releaseDate).getFullYear()
    : "TBD";

  return (
    <div className="group relative w-full overflow-visible">
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-xl bg-black/85 px-2 text-center backdrop-blur-md">
          <div className="mb-2 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-black text-white">
            18+
          </div>
          <p className="mb-4 text-xs font-bold text-white">Adult Content</p>
          <button
            onClick={() => authModal.openModal()}
            className="rounded-lg bg-white px-3 cursor-pointer py-1.5 text-xs font-black text-black transition active:scale-95"
          >
            Login
          </button>
        </div>
      )}

      <Link
        href={`/${item.mediaType}/${item.id}`}
        className={`relative block transition-transform cursor-pointer duration-500 ease-out sm:group-hover:scale-[1.03] ${
          isLocked ? "pointer-events-none" : ""
        }`}
      >
        {/* Border Container - Fixed the 'hide from left/right' by using an inset ring */}
        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-red-600">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.4]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-700">
              <PlayCircle size={40} strokeWidth={1.5} />
            </div>
          )}

          {/* Top Actions: Rating (Left) and Heart (Right) */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-2 ">
            <div className="flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 backdrop-blur-md">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-[10px] font-black text-white">
                {item.rating > 0 ? item.rating.toFixed(1) : "NEW"}
              </span>
            </div>
            <div className="flex  items-center justify-center ">
              {/* <Heart className="h-4 w-4" /> */}
              {/* <FavoriteButton
                mediaId={item.id}
                mediaType={item.mediaType}
                initialFavorited={item.isFavorited ?? false}
                isAuthenticated={isAuthenticated}
              /> */}
              {isAuthenticated && (
                <div className="flex items-center justify-center">
                  <FavoriteButton
                    mediaId={item.id}
                    mediaType={item.mediaType}
                    initialFavorited={item.isFavorited ?? false}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black via-black/80 to-transparent p-3 pt-10">
            <h3 className="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-red-500">
              {item.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-zinc-400">
              <span>{year}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
              <span className="uppercase tracking-tighter">
                {item.mediaType}
              </span>
            </div>
          </div>

          {/* Hover Play Icon (Center) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle className="h-12 w-12 text-white/80" strokeWidth={1} />
          </div>
        </div>
      </Link>
    </div>
  );
}
