// "use client";

// import { useState } from "react";
// import { DynamicCalendar } from "./DynamicCalendar";

// export function AuthForm({ onSuccess }: { onSuccess: (name: string) => void }) {
//   const [formData, setFormData] = useState({ name: "", email: "", year: "" });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.name && formData.email && formData.year) {
//       onSuccess(formData.name);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5 pt-4">
//       <div className="space-y-2">
//         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
//           Full Name
//         </label>
//         <input
//           required
//           type="text"
//           placeholder="John Doe"
//           className="h-12 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm text-white outline-none focus:border-red-600 transition-all"
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
//           Email Address
//         </label>
//         <input
//           required
//           type="email"
//           placeholder="name@example.com"
//           className="h-12 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm text-white outline-none focus:border-red-600 transition-all"
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//       </div>

//       <DynamicCalendar
//         selectedYear={formData.year}
//         onChange={(year) => setFormData({ ...formData, year })}
//       />

//       <button
//         type="submit"
//         className="mt-4 w-full rounded-xl bg-red-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-red-700 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
//       >
//         Create Account
//       </button>
//     </form>
//   );
// }
"use client";

import { DynamicCalendar } from "./DynamicCalendar";
import { useAuthForm } from "./hooks/use-auth-form";

export function AuthForm() {
  const { state, formAction, pending } = useAuthForm();

  return (
    <form action={formAction} className="space-y-5 pt-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
          Full Name
        </label>

        <input
          required
          type="text"
          name="fullName"
          placeholder="John Doe"
          className="h-12 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm text-white outline-none transition-all focus:border-red-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
          Email Address
        </label>

        <input
          required
          type="email"
          name="email"
          placeholder="name@example.com"
          className="h-12 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 text-sm text-white outline-none transition-all focus:border-red-600"
        />
      </div>

      <DynamicCalendar />

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      {state.success && (
        <p className="text-sm text-green-500">
          OTP sent successfully. Check your email.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-xl bg-red-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Sending OTP..." : "Continue"}
      </button>
    </form>
  );
}
