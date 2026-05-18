"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { toggleFavorite } from "@/features/Auth/services/auth.client";

interface FavoriteButtonProps {
  mediaId: number;
  mediaType: string;
  initialFavorited: boolean;
  isAuthenticated: boolean;
  onToggle?: (favorited: boolean) => void;
  onRequireAuth?: () => void;
  onOptimisticUnfavorite?: () => void;
}

export function FavoriteButton({
  mediaId,
  mediaType,
  initialFavorited,
  isAuthenticated,
  onToggle,
  onRequireAuth,
  onOptimisticUnfavorite,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      onRequireAuth?.();
      return;
    }

    try {
      setLoading(true);
      const optimisticValue = !favorited;

      if (!optimisticValue) {
        onOptimisticUnfavorite?.();
      }
      setFavorited(optimisticValue);

      const response = await toggleFavorite(mediaId, mediaType);
      console.log(response);

      if (!response.success) {
        setFavorited(!optimisticValue);
        if (!optimisticValue) {
          onToggle?.(true);
        }
        return;
      }

      setFavorited(response.favorited);
      onToggle?.(response.favorited);
    } catch (error) {
      console.error(error);
      setFavorited((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        /* 
          Responsive Sizing:
          - Mobile/Base: h-8 w-8 (Compact to fit the small cards perfectly)
          - Tablet (sm): h-9 w-9
          - Large Screens (md): h-10 w-10
        */
        "group flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-90",

        favorited
          ? "border-red-500/30 bg-red-500/20 text-red-500"
          : "border-white/10 bg-black/50 text-white hover:border-white/20 hover:bg-white/10",

        loading && "cursor-not-allowed opacity-70",
      )}
    >
      <Heart
        className={cn(
          /* 
            Responsive Icon Sizing:
            - Scales smoothly alongside the parent button frame bounds
          */
          "h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300",
          favorited && "scale-110 fill-red-500 text-red-500",
          !favorited && "group-hover:scale-110",
        )}
      />
    </button>
  );
}
