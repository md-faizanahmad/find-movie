export async function getPersonDetails(id: string) {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/person/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=combined_credits,images,external_ids`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}
