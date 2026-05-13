interface LoginFormProps {
  loading: boolean;

  error: string | null;
}

export function LoginForm({ loading, error }: LoginFormProps) {
  return (
    <div className="text-white">
      Login Form Placeholder
      {loading && (
        <p className="mt-4 text-sm text-neutral-400">Sending OTP...</p>
      )}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
