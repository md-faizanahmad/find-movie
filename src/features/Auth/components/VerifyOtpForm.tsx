"use client";

import { useState } from "react";

interface VerifyOtpFormProps {
  email: string;
  loading: boolean;
  error: string | null;
  onSubmit: (otp: string) => Promise<void>;
}

export function VerifyOtpForm({
  email,
  loading,
  error,
  onSubmit,
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit(otp);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="text-sm text-neutral-400">OTP sent to</p>
        <p className="mt-1 font-semibold text-white">{email}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Verification Code
        </label>

        <input
          type="text"
          required
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white outline-none transition-colors focus:border-red-500"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}
