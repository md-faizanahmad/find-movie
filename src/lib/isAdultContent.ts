// src/lib/moderation/isAdultContent.ts

import keywords from "./moderation/adultKeywords.json";
import { normalizeText } from "./moderation/normalizeText";
import type { AdultKeywords } from "./moderation/types";

const data = keywords as AdultKeywords;

type CheckInput = {
  title?: string;
  overview?: string;
  keywords?: string[];
  genres?: string[];
};

export function isAdultContent({
  title = "",
  overview = "",
  keywords = [],
  genres = [],
}: CheckInput): boolean {
  const combinedText = normalizeText(`
    ${title}
    ${overview}
    ${keywords.join(" ")}
    ${genres.join(" ")}
  `);

  let score = 0;

  // =========================
  // CATEGORY WEIGHTS
  // =========================

  score += calculateScore(combinedText, data.explicitTerms, 6);

  score += calculateScore(combinedText, data.bypassSpellings, 5);

  score += calculateScore(combinedText, data.platforms, 4);

  score += calculateScore(combinedText, data.adultSeries, 8);

  score += calculateScore(combinedText, data.actresses, 2);

  score += calculateScore(combinedText, data.searchIntent, 5);

  score += calculateScore(combinedText, data.romanizedHindi, 4);

  score += calculateScore(combinedText, data.emojiIndicators, 3);

  // =========================
  // COMBINATION BOOSTS
  // =========================

  const hasActress = containsAny(combinedText, data.actresses);

  const hasExplicit = containsAny(combinedText, data.explicitTerms);

  const hasIntent = containsAny(combinedText, data.searchIntent);

  const hasPlatform = containsAny(combinedText, data.platforms);

  const hasAdultSeries = containsAny(combinedText, data.adultSeries);

  // Actress + explicit
  // Example:
  // "Sydney Sweeney nude scenes"
  if (hasActress && hasExplicit) {
    score += 10;
  }

  // Intent + explicit
  // Example:
  // "watch hot web series online"
  if (hasIntent && hasExplicit) {
    score += 8;
  }

  // Platform + explicit
  // Example:
  // "ullu hot series"
  if (hasPlatform && hasExplicit) {
    score += 10;
  }

  // Known adult series / movie
  if (hasAdultSeries) {
    score += 10;
  }

  // =========================
  // FINAL THRESHOLD
  // =========================

  return score >= 14;
}

// ======================================================
// HELPERS
// ======================================================

function calculateScore(text: string, list: string[], weight: number): number {
  let total = 0;

  for (const item of list) {
    const normalizedItem = normalizeText(item);

    const regex = new RegExp(
      `(^|\\s)${escapeRegex(normalizedItem)}($|\\s)`,
      "i",
    );

    if (regex.test(text)) {
      total += weight;
    }
  }

  return total;
}

function containsAny(text: string, list: string[]): boolean {
  return list.some((item) => {
    const normalizedItem = normalizeText(item);

    const regex = new RegExp(
      `(^|\\s)${escapeRegex(normalizedItem)}($|\\s)`,
      "i",
    );

    return regex.test(text);
  });
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
