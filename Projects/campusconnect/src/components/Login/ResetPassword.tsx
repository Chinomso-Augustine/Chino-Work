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
    <div className="min-h-screen flex items-center justify-center bg-purple-50/40 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-200/60 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-purple-900 text-center mb-4">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50 outline-none text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50 outline-none text-sm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          {msg && <p className="text-green-700 text-sm">{msg}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-purple-700 text-white hover:bg-purple-800 transition disabled:opacity-60"
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
