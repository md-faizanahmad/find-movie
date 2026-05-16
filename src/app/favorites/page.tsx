import { requireAuth } from "@/features/Auth/lib/auth";
import { ClearFavoritesButton } from "@/features/favorites/components/ClearFavoritesButton";
import { FavoriteItemsGrid } from "@/features/favorites/components/FavoriteItemsGrid";
import { getFavoriteMedia } from "@/features/favorites/services/favorites.service";
import { Heart } from "lucide-react";

export default async function FavoritesPage() {
  const user = await requireAuth();
  const favoriteItems = await getFavoriteMedia(user.favorites);
  console.log(user.favorites);
  console.log(favoriteItems);
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Your Favorites</h1>

          <p className="mt-2 text-neutral-400">Movies and shows you saved.</p>
        </div>

        {user.favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/2 px-6 py-24 text-center">
            <Heart className="h-16 w-16 text-neutral-700" />

            <h2 className="mt-6 text-2xl font-bold">No Favorites Yet</h2>

            <p className="mt-3 max-w-md text-neutral-500">
              Start adding movies and TV shows to your favorites list.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-10 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black">Your Favorites</h1>

                <p className="mt-2 text-neutral-400">
                  Movies and shows you saved.
                </p>
              </div>

              {user.favorites.length > 0 && <ClearFavoritesButton />}
            </div>
            <FavoriteItemsGrid items={favoriteItems} />
          </div>
        )}
      </div>
    </main>
  );
}
