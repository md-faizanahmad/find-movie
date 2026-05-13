import { requireAuth } from "@/features/Auth/lib/auth";
import { CalendarDays, Mail } from "lucide-react";

export default async function ProfilePage() {
  const user = await requireAuth();

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-black">
              {user.fullName.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-black">{user.fullName}</h1>

              <p className="mt-1 text-neutral-400">Verified Member</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500" />

                <span className="text-sm font-medium text-neutral-400">
                  Email
                </span>
              </div>

              <p className="mt-3 text-lg font-semibold">{user.email}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-red-500" />

                <span className="text-sm font-medium text-neutral-400">
                  Favorites
                </span>
              </div>

              <p className="mt-3 text-lg font-semibold">
                {user.favorites.length} Saved
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
              Adult Verified
            </div>

            <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
              Email Verified
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
