import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

type AuthMode = "Sign Up" | "Login";

type LoginFormData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState<AuthMode>("Sign Up");
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgot = async () => {
    setErr(null);
    setMsg(null);
    if (!formData.email) {
      setErr("Enter your email first");
      return;
    }
    setLoading(true);

    try {
      const redirectTo = `${import.meta.env.VITE_APP_URL ?? window.location.origin}/auth/reset`;
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, { redirectTo });
      if (error) throw error;
      setMsg("Reset link sent. Check your email");
    } catch (error) {
      setErr(getErrorMessage(error, "Could not sent reset email."));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (action === "Sign Up" && formData.password !== formData.confirm) {
      setErr("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      if (action === "Sign Up") {
        const appUrl = import.meta.env.VITE_APP_URL ?? window.location.origin;
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${appUrl}/auth/callback`,
            data: { full_name: formData.name },
          },
        });

        if (error) throw error;
        setMsg("Check your email to confirm your account");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        if (data?.session) {
          navigate("/");
        }
      }
    } catch (error) {
      setErr(getErrorMessage(error, "Authentication failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center">
      <div className="app-card w-full max-w-md rounded-[32px] p-8">
        <div className="text-center mb-6">
          <div className="app-badge">Account</div>
          <div className="mt-4 text-2xl font-semibold text-slate-900">{action}</div>
          <p className="app-subtle mt-2 text-sm">
            Continue with a cleaner Google-inspired sign-in flow.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {action === "Login" ? null : (
            <div className="flex items-center rounded-2xl border border-[var(--google-border-subtle)] bg-white px-4 py-3">
              <FaUser className="mr-3 text-blue-500" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="flex-1 bg-transparent text-sm outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center rounded-2xl border border-[var(--google-border-subtle)] bg-white px-4 py-3">
            <FaEnvelope className="mr-3 text-blue-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="flex-1 bg-transparent text-sm outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center rounded-2xl border border-[var(--google-border-subtle)] bg-white px-4 py-3">
            <FaLock className="mr-3 text-blue-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="flex-1 bg-transparent text-sm outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {action === "Login" ? null : (
            <div className="flex items-center rounded-2xl border border-[var(--google-border-subtle)] bg-white px-4 py-3">
              <FaLock className="mr-3 text-blue-500" />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                className="flex-1 bg-transparent text-sm outline-none"
                value={formData.confirm}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {err && <p className="text-red-600 text-sm">{err}</p>}
          {msg && <p className="text-green-700 text-sm">{msg}</p>}

          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold ${
                action === "Login"
                  ? "cursor-default rounded-full bg-blue-50 text-blue-700"
                  : "app-btn-secondary"
              }`}
              onClick={() => {
                setAction("Sign Up");
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold ${
                action === "Sign Up"
                  ? "cursor-default rounded-full bg-blue-50 text-blue-700"
                  : "app-btn-secondary"
              }`}
              onClick={() => {
                setAction("Login");
              }}
              disabled={loading}
            >
              Login
            </button>
          </div>

          <button
            type="submit"
            className="app-btn-primary mt-4 w-full rounded-full disabled:opacity-60"
            disabled={loading}
          >
            {action === "Sign Up" ? "Create account" : "Sign in"}
          </button>
        </form>

        {action === "Sign Up" ? null : (
          <div className="mt-4 text-center text-sm text-gray-600">
            Lost Password?{" "}
            <span
              className="cursor-pointer font-medium text-blue-700 hover:underline"
              onClick={handleForgot}
            >
              Click Here
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
