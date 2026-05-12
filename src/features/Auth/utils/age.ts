const MINIMUM_AGE = 18;

export function isAdult(birthYear: number): boolean {
  const currentYear = new Date().getFullYear();

  const age = currentYear - birthYear;

  return age >= MINIMUM_AGE;
}
