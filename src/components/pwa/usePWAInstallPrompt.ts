// src/hooks/usePWAInstallPrompt.ts

"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT_DELAY = 1000 * 60; // 1 minute
const DISMISS_DURATION = 1000 * 60 * 60 * 24 * 3; // 3 days

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

interface UsePWAInstallPromptReturn {
  show: boolean;
  canInstall: boolean;
  installApp: () => Promise<void>;
  closePrompt: () => void;
}

export function usePWAInstallPrompt(): UsePWAInstallPromptReturn {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    if (isStandalone) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(
      window.navigator.userAgent,
    );

    if (!isMobile) return;

    const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");

    if (dismissedAt) {
      const isExpired = Date.now() - Number(dismissedAt) > DISMISS_DURATION;

      if (!isExpired) return;
    }

    const hasShownThisSession = sessionStorage.getItem("pwa-install-session");
    if (hasShownThisSession) return;

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();

      setDeferredPrompt(event);

      timerRef.current = setTimeout(() => {
        setShow(true);

        sessionStorage.setItem("pwa-install-session", "true");
      }, PROMPT_DELAY);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShow(false);
      localStorage.removeItem("pwa-install-dismissed-at");
    }
    setDeferredPrompt(null);
  };

  const closePrompt = () => {
    localStorage.setItem("pwa-install-dismissed-at", Date.now().toString());
    setShow(false);
  };

  return {
    show,
    canInstall: Boolean(deferredPrompt),
    installApp,
    closePrompt,
  };
}
