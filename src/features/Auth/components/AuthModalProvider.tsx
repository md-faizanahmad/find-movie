"use client";

import { ReactNode, useMemo } from "react";
import { AuthModal } from "./AuthModal";
import { AuthModalContext } from "@/context/auth-modal.context";
import { useAuthModalState } from "../hooks/use-auth-modal-state";
import { useAuthActions } from "../hooks/use-auth-actions";

interface AuthModalProviderProps {
  children: ReactNode;
}

/**
 * Global auth modal provider.
 *
 * Makes auth modal accessible
 * across the entire app.
 */
export function AuthModalProvider({ children }: AuthModalProviderProps) {
  const authState = useAuthModalState();

  const authActions = useAuthActions({
    email: authState.email,
    setEmail: authState.setEmail,
    setStep: authState.setStep,
    setLoading: authState.setLoading,
    setError: authState.setError,
    closeModal: authState.closeModal,
  });

  const value = useMemo(
    () => ({
      isOpen: authState.isOpen,
      openModal: authState.openModal,
      closeModal: authState.closeModal,
    }),
    [authState.isOpen],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      <AuthModal
        isOpen={authState.isOpen}
        onClose={authState.closeModal}
        step={authState.step}
        email={authState.email}
        loading={authState.loading}
        error={authState.error}
        onRequestOtp={authActions.requestOtpAction}
        onVerifyOtp={authActions.verifyOtpAction}
      />
    </AuthModalContext.Provider>
  );
}
