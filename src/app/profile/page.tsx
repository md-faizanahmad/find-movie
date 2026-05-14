import Link from "next/link";
import { Heart, Mail, ShieldCheck, ChevronRight } from "lucide-react";
import { requireAuth } from "@/features/Auth/lib/auth";
import { getFavoriteMedia } from "@/features/favorites/services/favorites.service";
import { FavoriteItemsGrid } from "@/features/favorites/components/FavoriteItemsGrid";

export default async function ProfilePage() {
  const user = await requireAuth();
  const favoriteItems = await getFavoriteMedia(user.favorites);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 antialiased">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        {/* Main Grid: Mobile single col, Desktop side-by-side */}
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Profile Section */}
          <aside className="w-full shrink-0 lg:w-[320px]">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-red-600 to-red-700 text-3xl font-bold shadow-2xl shadow-red-900/40">
                  {user.fullName.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-full bg-zinc-900 p-1">
                  <ShieldCheck className="h-6 w-6 text-red-500" />
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {user.fullName}
              </h1>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 ring-1 ring-white/10">
                  Verified Member
                </span>
              </div>
            </div>

            {/* Quick Info List */}
            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-4 rounded-xl bg-zinc-900/50 p-4 ring-1 ring-white/5">
                <Mail className="h-5 w-5 text-zinc-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Email
                  </p>
                  <p className="truncate text-sm font-medium text-zinc-300">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/favorites"
                className="group flex items-center gap-4 rounded-xl bg-zinc-900/50 p-4 ring-1 ring-white/5 transition-all hover:bg-zinc-800"
              >
                <Heart className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Collection
                  </p>
                  <p className="text-sm font-medium text-zinc-300">
                    {user.favorites.length} Saved Items
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>

          {/* Collection Grid Section */}
          <section className="flex-1">
            <div className="mb-6 flex items-end justify-between px-1">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">
                  Your Favorites
                </h2>
                <p className="text-sm text-zinc-500">
                  Quick access to your library
                </p>
              </div>

              {favoriteItems.length > 0 && (
                <Link
                  href="/favorites"
                  className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400"
                >
                  View All
                </Link>
              )}
            </div>

            {favoriteItems.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/5 bg-zinc-900/20 text-center">
                <Heart className="mb-4 h-10 w-10 text-zinc-800" />
                <p className="text-sm font-medium text-zinc-500">
                  Your collection is empty
                </p>
                <Link
                  href="/"
                  className="mt-4 text-xs font-bold uppercase text-white hover:underline"
                >
                  Browse Content
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl">
                <FavoriteItemsGrid items={favoriteItems.slice(0, 8)} />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
