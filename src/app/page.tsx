import { getTrendingMovies } from "@/features/movies/api/getTrendingMovies";

export default async function HomePage() {
  const data = await getTrendingMovies();

  return (
    <main className="px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Trending Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((movie) => (
          <div key={movie.id} className="bg-zinc-900 p-2 rounded-xl">
            <p className="text-sm font-medium line-clamp-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
