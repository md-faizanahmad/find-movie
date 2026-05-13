"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { requestOtp, verifyOtp } from "../services/auth.client";
import { AuthStep, RequestOtpPayload } from "../types/auth-modal.types";

interface UseAuthModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  step: AuthStep;
  email: string;
  loading: boolean;
  error: string | null;
  requestOtpAction: (payload: RequestOtpPayload) => Promise<void>;
  verifyOtpAction: (otp: string) => Promise<void>;
}

export function useAuthModal(): UseAuthModalReturn {
  const router = useRouter();
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
    setStep("login");
    setEmail("");
    setError(null);
  }

  async function requestOtpAction(payload: RequestOtpPayload) {
    try {
      setLoading(true);
      setError(null);
      await requestOtp(payload);
      setEmail(payload.email);
      setStep("verify");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to request OTP";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtpAction(otp: string) {
    try {
      setLoading(true);
      setError(null);
      await verifyOtp({
        email,
        otp,
      });

      setStep("success");
      router.refresh();

      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to verify OTP";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    isOpen,
    openModal,
    closeModal,
    step,
    email,
    loading,
    error,
    requestOtpAction,
    verifyOtpAction,
  };
}
