export async function getPopularPeople(page = 1) {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/person/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch people");
  }

  return res.json();
}
