import { CheckCircle2 } from "lucide-react";

export function AuthSuccess() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />

      <h2 className="mt-6 text-2xl font-black text-white">
        Successfully Logged In
      </h2>

      <p className="mt-2 text-sm text-neutral-400">Redirecting you back...</p>
    </div>
  );
}
