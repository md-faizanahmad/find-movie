"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  useTransition,
} from "react";

import Link from "next/link";

import { ChevronDown, Heart, LogOut, User } from "lucide-react";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { logoutAction } from "./actions/logout";

interface UserMenuProps {
  user: {
    firstName: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const menuRef = useRef<HTMLDivElement>(null);

  const initial = user.firstName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    startTransition(async () => {
      await logoutAction();

      router.refresh();
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-white/5 bg-neutral-900/50 p-1.5 pr-4 transition-all hover:bg-neutral-800 active:scale-95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          {initial}
        </div>

        <span className="hidden text-xs font-bold uppercase tracking-widest text-white md:block">
          {user.firstName}
        </span>

        <ChevronDown
          size={14}
          className={cn(
            "text-neutral-500 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute right-0 z-100 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 p-2 shadow-2xl backdrop-blur-2xl duration-200">
          <div className="flex flex-col gap-1">
            <MenuLink
              href="/profile"
              icon={<User size={16} />}
              label="My Profile"
            />

            <MenuLink
              href="/favorites"
              icon={<Heart size={16} />}
              label="Favorites"
            />

            <hr className="my-1 border-white/5" />

            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50"
            >
              <LogOut size={16} />

              {isPending ? "Logging Out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface MenuLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

function MenuLink({ href, icon, label }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
    >
      <span className="text-neutral-500">{icon}</span>

      {label}
    </Link>
  );
}
