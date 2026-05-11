"use client";

import { useEffect } from "react";

import { Clapperboard, X } from "lucide-react";

import { AuthForm } from "./AuthForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";

      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <div className="flex min-h-dvh items-center justify-center overflow-y-auto p-4">
        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-neutral-500 transition-colors hover:text-white"
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

          <AuthForm />
        </div>
      </div>
    </div>
  );
}
