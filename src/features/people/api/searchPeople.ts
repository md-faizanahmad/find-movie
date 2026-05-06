export async function searchPeople(query: string, page = 1) {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    query,
    page: String(page),
  });

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/search/person?${params}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}
