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

  // Notify parent after toggle
  onToggle?: (favorited: boolean) => void;

  // Open auth modal if user not logged in
  onRequireAuth?: () => void;
}

export function FavoriteButton({
  mediaId,
  mediaType,
  initialFavorited,
  isAuthenticated,
  onToggle,
  onRequireAuth,
}: FavoriteButtonProps) {
  // Local optimistic favorite state
  const [favorited, setFavorited] = useState(initialFavorited);

  // Prevent multiple rapid clicks
  const [loading, setLoading] = useState(false);

  async function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    // Prevent card link navigation when clicking favorite button
    e.preventDefault();

    e.stopPropagation();

    // Require authentication
    if (!isAuthenticated) {
      onRequireAuth?.();

      return;
    }

    try {
      setLoading(true);

      // Optimistic UI update
      const optimisticValue = !favorited;

      setFavorited(optimisticValue);

      // Toggle favorite in database
      const response = await toggleFavorite(mediaId, mediaType);
      console.log(response);

      // Rollback if request failed
      if (!response.success) {
        setFavorited(!optimisticValue);

        return;
      }

      // Sync with server response
      setFavorited(response.favorited);

      // Notify parent component
      onToggle?.(response.favorited);
    } catch (error) {
      console.error(error);

      // Rollback on unexpected error
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
        "group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer",

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
