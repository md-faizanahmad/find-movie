"use client";

import { useState } from "react";

interface AdultVerificationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdultVerificationModal({
  open,
  onClose,
  onSuccess,
}: AdultVerificationModalProps) {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!confirmed) {
      alert("Please confirm you are 18+");
      return;
    }

    localStorage.setItem("adult-unlocked", "true");

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
            18+ Mature Content
          </div>

          <h2 className="text-xl font-bold text-white">Age Verification</h2>

          <p className="mt-2 text-sm text-neutral-400">
            This content may contain adult or explicit material.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
            />
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-neutral-900/60 p-4">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 accent-red-600"
            />

            <span className="text-sm text-neutral-300">
              I confirm that I am at least 18 years old and wish to view mature
              content.
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
