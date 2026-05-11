"use client";

import { X, Clapperboard } from "lucide-react";
import { AuthForm } from "./AuthForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <Clapperboard className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white">
            Join the <span className="text-red-600">Club</span>
          </h2>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
            Discover your next favorite story
          </p>
        </div>

        <AuthForm
          onSuccess={(name) => {
            onLogin(name);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
