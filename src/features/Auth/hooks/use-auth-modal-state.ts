"use client";

import { useState } from "react";
import { AuthStep } from "../types/auth-modal.types";

/**
 * Handles auth modal UI state.
 *
 * Responsibilities:
 * - modal visibility
 * - auth step flow
 * - loading state
 * - error state
 * - current email
 */
export function useAuthModalState() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);

    /**
     * Small delay prevents UI flicker
     * during modal close animation.
     */
    setTimeout(() => {
      setStep("login");
      setEmail("");
      setError(null);
      setLoading(false);
    }, 200);
  }

  return {
    isOpen,
    step,
    email,
    loading,
    error,
    setStep,
    setEmail,
    setLoading,
    setError,
    openModal,
    closeModal,
  };
}
