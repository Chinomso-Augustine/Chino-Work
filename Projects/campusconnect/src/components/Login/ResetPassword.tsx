import { useState, type FormEvent } from "react";
import { supabase } from "../../supabaseClient";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMsg("Password updated! You can now log in.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center">
      <div className="app-card w-full max-w-md rounded-[32px] p-8">
        <div className="text-center">
          <div className="app-badge">Security</div>
        </div>
        <h2 className="mb-2 mt-4 text-center text-2xl font-semibold text-slate-900">Reset Password</h2>
        <p className="app-subtle mb-4 text-center text-sm">
          Update your password with the same calm, focused flow used across the app.
        </p>
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="app-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="app-input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          {msg && <p className="text-green-700 text-sm">{msg}</p>}
          <button
            type="submit"
            className="app-btn-primary w-full rounded-full disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
