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
        className={`fixed inset-0 z-40 bg-black/60 w-10 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Dropdown / Bottom Sheet Menu container */}
      <div
        className={`z-50 rounded-t-2xl border border-white/10 bg-zinc-950/98 p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.32,0.94,0.6,1)]
          fixed bottom-0 left-0 right-0 transform translate-y-full w-full
          md:absolute md:top-full md:bottom-auto md:left-auto md:right-0 md:w-48 md:mt-2 md:rounded-2xl md:translate-y-0
          ${
            open
              ? "translate-y-0 opacity-100 scale-100 visible"
              : "invisible opacity-0 translate-y-full md:translate-y-2 md:scale-95"
          }`}
      >
        {/* Mobile Swipe/Pull Indicator notch line top center */}
        <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto my-1.5 md:hidden" />

        {/* Profile Link Option */}
        <Link
          href="/profile"
          onClick={() => setOpen(false)}
          prefetch
          className="group flex items-center gap-3 rounded-xl px-4 py-3.5 md:py-2.5 text-base md:text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-white active:bg-white/10"
        >
          <User className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />
          <span>Profile</span>
        </Link>

        {/* Favorites Link Option */}
        <Link
          href="/favorites"
          onClick={() => setOpen(false)}
          prefetch
          className="group flex items-center gap-3 rounded-xl px-4 py-3.5 md:py-2.5 text-base md:text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-white active:bg-white/10"
        >
          <Heart className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />
          <span>Favorites</span>
        </Link>

        {/* Thin Gradient Styling Divider Bar */}
        <div className="my-2 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Action Logout Trigger Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 md:py-2.5 text-base md:text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 active:bg-red-500/20"
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
  );
}
