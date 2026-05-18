// src/components/pwa/PWAInstallCard.tsx

"use client";

import Image from "next/image";

import { Download, X } from "lucide-react";
import { usePWAInstallPrompt } from "./usePWAInstallPrompt";

export function PWAInstallCard() {
  const { show, canInstall, installApp, closePrompt } = usePWAInstallPrompt();

  if (!show || !canInstall) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center md:bottom-6">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {/* Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-white/5" />

        {/* Close */}
        <button
          type="button"
          onClick={closePrompt}
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          aria-label="Close install prompt"
        >
          <X className="size-4" />
        </button>

        <div className="relative flex flex-col gap-5 p-5">
          {/* App Info */}
          <div className="flex items-center gap-4">
            <div className="relative size-16 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
              <Image
                src="/brand.png"
                alt="FindMovie"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white">
                FindMovie
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Discover trending movies & TV shows
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                <span>Entertainment</span>

                <span>•</span>

                <span>PWA App</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-white/5 bg-white/3 p-4">
            <p className="text-sm leading-6 text-zinc-300">
              Install FindMovie for a faster, immersive app experience with
              quick access directly from your home screen.
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={installApp}
            className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.01] hover:opacity-90 active:scale-[0.98]"
          >
            <Download className="size-4 transition-transform group-hover:-translate-y-0.5" />

            <span>Install App</span>
          </button>
        </div>
      </div>
    </div>
  );
}
