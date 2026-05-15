// src/lib/moderation/normalizeText.ts

export function normalizeText(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")

      // replace common bypass chars
      .replace(/0/g, "o")
      .replace(/1/g, "i")
      .replace(/3/g, "e")
      .replace(/4/g, "a")
      .replace(/5/g, "s")
      .replace(/7/g, "t")
      .replace(/@/g, "a")
      .replace(/\$/g, "s")

      // remove symbols
      .replace(/[^\w\s]/g, " ")

      // collapse spaces
      .replace(/\s+/g, " ")
      .trim()
  );
}
