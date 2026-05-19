export function getImageUrl(
  path: string,
  size: "w300" | "w500" | "original" = "w500",
) {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
