"use client";

import Link from "next/link";

import { ChevronDown, Heart, LogOut, User } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { NavbarUser } from "@/components/layout/navbar/navbar.types";

import { logout } from "./services/auth.client";

interface UserMenuProps {
  user: NavbarUser | null;

  onLoginClick: () => void;
}

export function UserMenu({ user, onLoginClick }: UserMenuProps) {
  const router = useRouter();

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      setLogoutLoading(true);

      setOpen(false);

      await logout();

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLogoutLoading(false);
    }
  }

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-all hover:border-white/20 hover:bg-white/10"
      >
        <span>{user.firstName}</span>

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-14 z-50 w-40 rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <Link
          href="/profile"
          // onClick={() => setOpen(false)}
          prefetch
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <User className="h-4 w-4" />

          <span>Profile</span>
        </Link>

        <Link
          href="/favorites"
          // onClick={() => setOpen(false)}
          prefetch
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Heart className="h-4 w-4" />

          <span>Favorites</span>
        </Link>

        <div className="my-2 h-px bg-white/5" />

        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />

          <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
}
