// export const requiredEnv = [
//   "TMDB_API_KEY",
//   "TMDB_BASE_URL",
//   "TMDB_IMAGE_BASE_URL",
// ] as const;

// type EnvKey = (typeof requiredEnv)[number];

// function getEnvVariable(key: EnvKey): string {
//   const value = process.env[key];
//   if (!value) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return value;
// }

// export const env = {
//   TMDB_API_KEY: getEnvVariable("TMDB_API_KEY"),
//   TMDB_BASE_URL: getEnvVariable("TMDB_BASE_URL"),
//   TMDB_IMAGE_BASE_URL: getEnvVariable("TMDB_IMAGE_BASE_URL"),
// };
// console.log("ENV CHECK:", {
//   TMDB_API_KEY: process.env.TMDB_API_KEY ? "EXISTS" : "MISSING",
// });

export const requiredEnv = [
  "TMDB_API_KEY",
  "TMDB_BASE_URL",
  "TMDB_IMAGE_BASE_URL",

  "NEXT_PUBLIC_BASE_URL",
] as const;

type EnvKey = (typeof requiredEnv)[number];

function getEnvVariable(key: EnvKey): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  TMDB_API_KEY: getEnvVariable("TMDB_API_KEY"),
  TMDB_BASE_URL: getEnvVariable("TMDB_BASE_URL"),
  TMDB_IMAGE_BASE_URL: getEnvVariable("TMDB_IMAGE_BASE_URL"),
  NEXT_PUBLIC_BASE_URL: getEnvVariable("NEXT_PUBLIC_BASE_URL"),
};
