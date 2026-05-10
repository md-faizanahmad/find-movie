// interface DiscoverMoviesParams {
//   page?: number;

//   language?: string;

//   sortBy?: string;
// }

// export async function discoverMovies({
//   page = 1,
//   language,
//   sortBy = "popularity.desc",
// }: DiscoverMoviesParams) {
//   const params = new URLSearchParams({
//     api_key: process.env.TMDB_API_KEY!,
//     page: String(page),
//     sort_by: sortBy,
//   });

//   if (language) {
//     params.append("with_original_language", language);
//   }

//   const res = await fetch(
//     `${process.env.TMDB_BASE_URL}/discover/movie?${params}`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Failed to discover movies");
//   }

//   return res.json();
// }

// refactor
interface DiscoverMoviesParams {
  page?: number;
  withOriginalLanguage?: string;
  sortBy?: string;
}

export async function discoverMovies({
  page = 1,
  withOriginalLanguage,
  sortBy = "popularity.desc",
}: DiscoverMoviesParams) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    page: String(page),
    sort_by: sortBy,
  });

  if (withOriginalLanguage) {
    params.append("with_original_language", withOriginalLanguage);
  }

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/discover/movie?${params}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to discover movies");
  }

  return res.json();
}
