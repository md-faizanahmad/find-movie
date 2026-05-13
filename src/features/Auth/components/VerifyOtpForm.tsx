interface VerifyOtpFormProps {
  email: string;

  loading: boolean;

  error: string | null;
}

export function VerifyOtpForm({ email, loading, error }: VerifyOtpFormProps) {
  return (
    <div className="text-white">
      <p>OTP sent to:</p>

      <p className="mt-2 font-bold">{email}</p>

      {loading && (
        <p className="mt-4 text-sm text-neutral-400">Verifying OTP...</p>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
