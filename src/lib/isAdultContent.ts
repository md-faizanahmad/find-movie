const adultKeywords = [
  // Porn / explicit
  "porn",
  "porno",
  "pornographic",
  "xxx",
  "nsfw",
  "adult",
  "adult film",
  "hardcore",
  "softcore",
  "explicit",
  "explicit sex",
  "sexual content",
  "sex tape",
  "group sex",
  "oral sex",
  "phone sex",
  "safe sex",
  "sex play",
  "sex rider",
  "how to have sex",

  // Sexual acts
  "sex",
  "sexual",
  "anal",
  "blowjob",
  "handjob",
  "deepthroat",
  "threesome",
  "orgy",
  "bdsm",
  "fetish",
  "milf",

  // Nudity
  "nude",
  "nudity",
  "topless",
  "uncensored",

  // Erotic themes
  "erotic",
  "seduction",
  "sensual",
  "lust",
  "temptation",
  "desire",
  "passion",
  "provocative",
  "intimate",
  "mistress",
  "affair",
  "hookup",
  "one night stand",

  // Adult industry
  "onlyfans",
  "camgirl",
  "camgirls",
  "cam model",
  "escort",
  "brothel",
  "stripper",
  "strip club",

  // OTT / known adult series
  "charmsukh",
  "palang tod",
  "gandii baat",
  "kavita bhabhi",
  "rasbhari",
  "shanthi appuram nithya",
  "kunwari dulhan",
  "ggs - ganteng-ganteng sange",
  "hot girls wanted",
  "how to have sex",
  "how to have cyber sex on the internet",

  // Rating markers
  "18+",
  "a rated",
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

  return (
    media.adult === true ||
    adultKeywords.some((word) => text.includes(word.toLowerCase()))
  );
}
