"use client";

import Link from "next/link";
import { ChevronDown, Heart, LogOut, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        className="relative overflow-hidden rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all duration-300 hover:scale-105 hover:bg-red-500 active:scale-95"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button - Glassmorphic Pill Style */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`group flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-bold tracking-wide text-white transition-all duration-300 active:scale-95 ${
          open
            ? "border-red-500/40 bg-zinc-900/90 shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            : "border-white/10 bg-zinc-900/40 backdrop-blur-md hover:border-white/20 hover:bg-zinc-800/60"
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors group-hover:bg-red-500/20 group-hover:text-red-400">
          <User className="h-3 w-3" />
        </div>
        <span className="max-w-25 truncate">{user.firstName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-300 ease-out group-hover:text-white ${
            open ? "rotate-180 text-red-400" : ""
          }`}
        />
      </button>

      {/* Dim Dark Backdrop overlay for Mobile Screen to emphasize active menu focus */}
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 md:absolute md:inset-auto md:top-full md:right-0 md:block md:px-0 md:pb-0 ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 ease-out md:mt-2 md:w-56 md:max-w-none md:rounded-2xl md:shadow-[0_10px_40px_rgba(0,0,0,0.7)] ${
            open
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 md:translate-y-2 md:scale-95"
          }`}
        >
          {/* Mobile Handle */}
          <div className="flex justify-center pt-3 md:hidden">
            <div className="h-1 w-10 rounded-full bg-zinc-700" />
          </div>

          {/* User Info */}
          <div className="border-b border-white/5 px-5 py-4 md:hidden">
            <p className="text-sm font-semibold text-white">{user.firstName}</p>

            <p className="mt-1 text-xs text-zinc-500">Account menu</p>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              prefetch
              className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/5 hover:text-white active:scale-[0.98]"
            >
              <User className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />

              <span>Profile</span>
            </Link>

            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              prefetch
              className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/5 hover:text-white active:scale-[0.98]"
            >
              <Heart className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />

              <span>Favorites</span>
            </Link>

            <div className="my-2 h-px bg-white/5" />

            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {logoutLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-400" />
              ) : (
                <LogOut className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />
              )}

              <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
