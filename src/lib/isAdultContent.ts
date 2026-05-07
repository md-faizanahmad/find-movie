const strongAdultKeywords = [
  "porn",
  "porno",
  "pornographic",
  "xxx",
  "nsfw",
  "adult film",
  "hardcore",
  "softcore",
  "onlyfans",
  "camgirl",
  "camgirls",
  "cam model",
  "escort",
  "brothel",
  "stripper",
  "strip club",
  "sex tape",
  "sexual content",
  "explicit sex",
  "group sex",
  "bdsm",
  "fetish",
  "orgy",
  "milf",
  "anal",
  "blowjob",
  "nude",
  "nudity",
  "uncensored",
  "18+",
  "sex play",
  "sex, party and lies",
  "how to have sex",
];

const mediumAdultKeywords = [
  "erotic",
  "seduction",
  "sensual",
  "sexual",
  "sex",
  "sex play",
  "affair",
  "mistress",
  "lust",
  "intimate",
  "temptation",
  "desire",
  "passion",
  "provocative",
  "sex, party and lies",
  "how to have sex",
];

const suspiciousGenres = [
  10749, // Romance
];

export function isAdultContent(movie: any) {
  const text = `
    ${movie.title || ""}
    ${movie.original_title || ""}
    ${movie.overview || ""}
  `
    .toLowerCase()
    .replace(/\s+/g, " ");

  const strongMatches = strongAdultKeywords.filter((word) =>
    text.includes(word),
  ).length;

  const mediumMatches = mediumAdultKeywords.filter((word) =>
    text.includes(word),
  ).length;

  const hasSuspiciousGenre =
    movie.genre_ids?.some((id: number) => suspiciousGenres.includes(id)) ||
    false;

  /*
    DETECTION RULES

    1. TMDB adult flag = always adult
    2. ANY strong keyword = adult
    3. 2+ medium keywords = adult
    4. 1 medium keyword + romance genre = adult
  */

  return (
    movie.adult === true ||
    strongMatches >= 1 ||
    mediumMatches >= 2 ||
    (mediumMatches >= 1 && hasSuspiciousGenre)
  );
}
