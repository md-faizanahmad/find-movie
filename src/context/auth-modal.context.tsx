"use client";

import { createContext, useContext } from "react";

interface AuthModalContextValue {
  isOpen: boolean;

  openModal: () => void;

  closeModal: () => void;
}

export const AuthModalContext = createContext<AuthModalContextValue | null>(
  null,
);

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used inside AuthModalProvider");
  }

  return context;
}
