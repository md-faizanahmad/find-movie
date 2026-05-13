"use client";

import { X } from "lucide-react";

import { AuthSuccess } from "./AuthSuccess";

import { LoginForm } from "./LoginForm";

import { VerifyOtpForm } from "./VerifyOtpForm";

import { useAuthModal } from "../hooks/use-auth-modal";

interface AuthModalProps {
  isOpen: boolean;

  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const {
    step,

    email,

    loading,

    error,
  } = useAuthModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        {step !== "success" && (
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">
              {step === "login" ? "Welcome Back" : "Verify OTP"}
            </h2>

            <p className="mt-2 text-sm text-neutral-400">
              {step === "login"
                ? "Login to access favorites and personalized features."
                : "Enter the verification code sent to your email."}
            </p>
          </div>
        )}

        {/* Step Renderer */}
        {step === "login" && <LoginForm loading={loading} error={error} />}

        {step === "verify" && (
          <VerifyOtpForm email={email} loading={loading} error={error} />
        )}

        {step === "success" && <AuthSuccess />}
      </div>
    </div>
  );
}
