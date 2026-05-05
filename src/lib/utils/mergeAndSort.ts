// src/features/home/utils/mergeAndSort.ts

import { Media } from "@/features/home/services/home.service";

export function mergeAndSort(items: Media[], limit = 20): Media[] {
  if (!items || items.length === 0) return [];

  const map = new Map<number, Media>();

  for (const item of items) {
    // Skip invalid entries
    if (!item?.id) continue;

    // Keep the one with higher popularity if duplicate exists
    const existing = map.get(item.id);

    if (!existing || item.popularity > existing.popularity) {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values())
    .sort((a, b) => {
      // Handle missing/null popularity safely
      const popA = a.popularity ?? 0;
      const popB = b.popularity ?? 0;

      return popB - popA;
    })
    .slice(0, limit);
}
