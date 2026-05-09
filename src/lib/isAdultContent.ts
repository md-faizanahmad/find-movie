const explicitKeywords = [
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
];

const suspiciousKeywords = [
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
  "safe sex",
  "phone sex",
  "how to have sex",
  "sex & more",
  "the sex trip",
  "sex rider",
];

const forcedAdultTitles = [
  "charmsukh",
  "palang tod",
  "shanthi appuram nithya",
  "kunwari dulhan",
  "ggs - ganteng-ganteng sange",
  "hot girls wanted",
  "gandii baat",
  "kavita bhabhi",
  "rasbhari",
];

const suspiciousGenres = [
  10749, // Romance
];

export function isAdultContent(media: any) {
  const text = `
    ${media.title || ""}
    ${media.original_title || ""}
    ${media.name || ""}
    ${media.original_name || ""}
    ${media.overview || ""}
  `
    .toLowerCase()
    .replace(/\s+/g, " ");

  const explicitMatch = explicitKeywords.some((word) => text.includes(word));

  const suspiciousMatch = suspiciousKeywords.some((word) =>
    text.includes(word),
  );

  const forcedTitleMatch = forcedAdultTitles.some((title) =>
    text.includes(title),
  );

  const hasSuspiciousGenre =
    media.genre_ids?.some((id: number) => suspiciousGenres.includes(id)) ||
    false;

  /*
    FINAL RULES

    1. TMDB adult flag
    2. Explicit keywords
    3. Forced adult titles
    4. Suspicious keywords + romance genre
  */

  return (
    media.adult === true ||
    explicitMatch ||
    forcedTitleMatch ||
    (suspiciousMatch && hasSuspiciousGenre)
  );
}
