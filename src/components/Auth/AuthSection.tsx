"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { UserMenu } from "./UserMenu";

export function AuthSection() {
  // Replace this with your actual auth logic (e.g., from NextAuth or a custom hook)
  const [user, setUser] = useState<{ firstName: string } | null>({
    firstName: "Gemini",
  });

  if (!user) {
    return (
      <Link
        href="/login"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 hover:border-red-600 active:scale-95"
      >
        <LogIn
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
        Login
      </Link>
    );
  }

  return <UserMenu user={user} onLogout={() => setUser(null)} />;
}
