"use client";

import { useState } from "react";
import { useContentPreferences } from "@/providers/ContentPreferencesProvider";

export function AdultToggle() {
  const { preferences, enableAdultContent, disableAdultContent } =
    useContentPreferences();

  const [email, setEmail] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const handleEnable = () => {
    if (!email || !ageConfirmed) {
      alert("Complete verification");
      return;
    }

    enableAdultContent();
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold">Adult Content</h2>

      {preferences.allowAdult ? (
        <button
          onClick={disableAdultContent}
          className="rounded-xl bg-red-500 px-4 py-2"
        >
          Disable Adult Content
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-neutral-900 p-3"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
            />
            I confirm I am 18+
          </label>

          <button
            onClick={handleEnable}
            className="rounded-xl bg-white px-4 py-2 text-black"
          >
            Enable Adult Content
          </button>
        </div>
      )}
    </div>
  );
}
