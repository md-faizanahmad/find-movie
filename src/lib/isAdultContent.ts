const adultKeywords = [
  "porn",
  "porno",
  "pornographic",
  "erotic",
  "nudity",
  "explicit sex",
  "sexual content",
  "escort",
  "stripper",
  "brothel",
  "xxx",
];

const suspiciousGenres = [
  10749, // Romance
];

export function isAdultContent(movie: any) {
  const text = `
    ${movie.title || ""}
    ${movie.original_title || ""}
    ${movie.overview || ""}
  `.toLowerCase();

  const keywordMatches = adultKeywords.filter((word) =>
    text.includes(word),
  ).length;

  const hasSuspiciousGenre = movie.genre_ids?.some((id: number) =>
    suspiciousGenres.includes(id),
  );

  /*
    RULES:
    - TMDB adult flag always true
    - OR multiple adult keywords
    - OR 1 keyword + suspicious genre
  */

  return (
    movie.adult === true ||
    keywordMatches >= 2 ||
    (keywordMatches >= 1 && hasSuspiciousGenre)
  );
}
