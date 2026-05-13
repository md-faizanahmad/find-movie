import Link from "next/link";

import { Heart, Mail, ShieldCheck } from "lucide-react";

import { requireAuth } from "@/features/Auth/lib/auth";

import { getFavoriteMedia } from "@/features/favorites/services/favorites.service";
import { FavoriteItemsGrid } from "@/features/favorites/components/FavoriteItemsGrid";

export default async function ProfilePage() {
  const user = await requireAuth();

  const favoriteItems = await getFavoriteMedia(user.favorites);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 antialiased">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Top Section */}
        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          {/* Profile Card */}
          <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-xl">
            {/* Header */}
            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-3xl font-bold shadow-xl shadow-red-900/20">
                {user.fullName.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {user.fullName}
                </h1>

                <p className="mt-1 flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  Verified Member
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/70 p-5">
                <div className="rounded-xl bg-zinc-800 p-2.5 text-red-500">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Email Address
                  </p>

                  <p className="font-medium text-zinc-200">{user.email}</p>
                </div>
              </div>

              {/* Favorites */}
              <Link
                href="/favorites"
                className="group flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900/70 p-5 transition-colors hover:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-zinc-800 p-2.5 text-red-500">
                    <Heart className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Favorites
                    </p>

                    <p className="font-medium text-zinc-200">
                      {user.favorites.length} items saved
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium text-zinc-500 transition-colors group-hover:text-white">
                  View
                </span>
              </Link>
            </div>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500 ring-1 ring-inset ring-green-500/20">
                18+ Verified
              </span>

              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 ring-1 ring-inset ring-blue-500/20">
                Secure Account
              </span>
            </div>
          </div>

          {/* Favorites Preview */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Favorite Collection</h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Your recently saved movies and shows.
                </p>
              </div>

              <Link
                href="/favorites"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All
              </Link>
            </div>

            {favoriteItems.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-900/20 px-6 text-center">
                <Heart className="h-14 w-14 text-zinc-700" />

                <h3 className="mt-5 text-2xl font-bold">No Favorites Yet</h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
                  Start saving movies and TV shows to build your personal
                  collection.
                </p>
              </div>
            ) : (
              <FavoriteItemsGrid items={favoriteItems.slice(0, 8)} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
