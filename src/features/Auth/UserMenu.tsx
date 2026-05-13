"use client";

import Link from "next/link";

import { ChevronDown, Heart, LogOut, User } from "lucide-react";
import { NavbarUser } from "@/components/layout/navbar/navbar.types";

interface UserMenuProps {
  user: NavbarUser | null;
}

export function UserMenu({ user }: UserMenuProps) {
  if (!user) {
    return (
      <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500">
        Login
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-all hover:border-white/20 hover:bg-white/10">
        <span>{user.firstName}</span>

        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="invisible absolute right-0 top-14 z-50 w-56 translate-y-2 rounded-2xl border border-white/10 bg-neutral-950/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <User className="h-4 w-4" />

          <span>Profile</span>
        </Link>

        <Link
          href="/favorites"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Heart className="h-4 w-4" />

          <span>Favorites</span>
        </Link>

        <div className="my-2 h-px bg-white/5" />

        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />

            <span>Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
