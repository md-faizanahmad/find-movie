"use client";

import { Heart } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { cn } from "@/lib/utils/cn";
import { toggleFavorite } from "@/features/Auth/services/auth.client";

interface FavoriteButtonProps {
  mediaId: number;
  mediaType: string;
  initialFavorited: boolean;

  isAuthenticated: boolean;

  onRequireAuth?: () => void;
}

export function FavoriteButton({
  mediaId,
  mediaType,
  initialFavorited,

  isAuthenticated,

  onRequireAuth,
}: FavoriteButtonProps) {
  const router = useRouter();

  const [favorited, setFavorited] = useState(initialFavorited);

  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (!isAuthenticated) {
      onRequireAuth?.();

      return;
    }

    try {
      setLoading(true);

      const optimisticValue = !favorited;

      setFavorited(optimisticValue);

      const response = await toggleFavorite(mediaId, mediaType);

      if (!response.success) {
        setFavorited(!optimisticValue);

        return;
      }

      router.refresh();
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
        "group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",

        favorited
          ? "border-red-500/30 bg-red-500/20 text-red-500"
          : "border-white/10 bg-black/40 text-white hover:border-white/20 hover:bg-white/10",

        loading && "cursor-not-allowed opacity-70",
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",

          favorited && "scale-110 fill-red-500 text-red-500",

          !favorited && "group-hover:scale-110",
        )}
      />
    </button>
  );
}
