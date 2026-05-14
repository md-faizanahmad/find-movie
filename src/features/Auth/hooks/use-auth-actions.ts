"use client";

import { useRouter } from "next/navigation";

import { requestOtp, verifyOtp } from "../services/auth.client";

import { AuthStep } from "../types/auth-modal.types";

interface UseAuthActionsParams {
  email: string;

  setEmail: (value: string) => void;

  setStep: (step: AuthStep) => void;

  setLoading: (value: boolean) => void;

  setError: (value: string | null) => void;

  closeModal: () => void;
}

/**
 * Handles auth API actions.
 *
 * Responsibilities:
 * - request OTP
 * - verify OTP
 * - success flow
 * - refresh session
 */
export function useAuthActions({
  email,

  setEmail,

  setStep,

  setLoading,

  setError,

  closeModal,
}: UseAuthActionsParams) {
  const router = useRouter();

  async function requestOtpAction(payload: {
    fullName: string;

    email: string;

    birthYear: number;
  }) {
    try {
      setLoading(true);

      setError(null);

      await requestOtp(payload);

      setEmail(payload.email);

      setStep("verify");
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Failed to send OTP");
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

      /**
       * Refresh server session
       * after successful login.
       */
      router.refresh();

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return {
    requestOtpAction,

    verifyOtpAction,
  };
}
