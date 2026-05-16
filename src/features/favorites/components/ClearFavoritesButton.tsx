"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { Trash2 } from "lucide-react";

export function ClearFavoritesButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleClearFavorites() {
    try {
      setLoading(true);

      const response = await fetch("/api/favorites/clear", {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClearFavorites}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />

      {loading ? "Clearing..." : "Clear Favorites"}
    </button>
  );
}
