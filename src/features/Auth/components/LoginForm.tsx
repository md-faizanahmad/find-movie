"use client";

import { useState } from "react";

interface LoginFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (payload: {
    fullName: string;
    email: string;
    birthYear: number;
  }) => Promise<void>;
}

export function LoginForm({ loading, error, onSubmit }: LoginFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthYearError, setBirthYearError] = useState("");

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   await onSubmit({
  //     fullName,
  //     email,
  //     birthYear: Number(birthYear),
  //   });
  // }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (birthYearError) {
      return;
    }

    await onSubmit({
      fullName,
      email,
      birthYear: Number(birthYear),
    });
  }

  function validateBirthYear(value: string) {
    const year = Number(value);
    const currentYear = new Date().getFullYear();

    if (!value) {
      setBirthYearError("");
      return;
    }

    if (currentYear - year < 18) {
      setBirthYearError("Must be 18+");
    } else {
      setBirthYearError("");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Full Name
        </label>

        <input
          type="text"
          required
          value={fullName}
          // onChange={(event) => setFullName(event.target.value)}
          onChange={(event) => {
            const value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
            setFullName(value);
          }}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-red-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-red-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          Birth Year
        </label>

        {/* <input
          type="number"
          required
          value={birthYear}
          onChange={(event) => setBirthYear(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-red-500"
        /> */}
        <input
          type="number"
          required
          value={birthYear}
          onChange={(event) => {
            const value = event.target.value;
            setBirthYear(value);
            validateBirthYear(value);
          }}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-red-500"
        />

        {birthYearError && (
          <p className="mt-1 text-sm text-red-500">{birthYearError}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl cursor-pointer bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending OTP..." : "Continue"}
      </button>
    </form>
  );
}
