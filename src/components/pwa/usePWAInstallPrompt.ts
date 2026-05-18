// src/hooks/usePWAInstallPrompt.ts

"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;

  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

interface UsePWAInstallPromptReturn {
  show: boolean;
  installApp: () => Promise<void>;
  closePrompt: () => void;
}

export function usePWAInstallPrompt(): UsePWAInstallPromptReturn {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    if (isStandalone) return;

    const dismissed = localStorage.getItem("pwa-install-dismissed");

    if (dismissed) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      setDeferredPrompt(event as BeforeInstallPromptEvent);

      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShow(false);
    }

    setDeferredPrompt(null);
  };

  const closePrompt = () => {
    localStorage.setItem("pwa-install-dismissed", "true");

    setShow(false);
  };

  return {
    show,
    installApp,
    closePrompt,
  };
}
