import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { UserMenu } from "./UserMenu";

export function AuthSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string } | null>(null);

  return (
    <>
      {!user ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 active:scale-95"
        >
          Login
        </button>
      ) : (
        <UserMenu user={user} onLogout={() => setUser(null)} />
      )}

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={(name) => setUser({ firstName: name })}
      />
    </>
  );
}
