// src/components/pwa/PWAInstallPrompt.tsx

"use client";

import { Download, X } from "lucide-react";
import { usePWAInstallPrompt } from "./usePWAInstallPrompt";

export function PWAInstallPrompt() {
  const { show, installApp, closePrompt } = usePWAInstallPrompt();

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <Download className="size-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Install App</p>

            <p className="text-xs text-neutral-400">
              Add Movie App to your home screen
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={installApp}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            Install
          </button>

          <button
            type="button"
            onClick={closePrompt}
            className="rounded-full p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
