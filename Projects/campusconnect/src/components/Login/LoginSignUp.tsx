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
    <div className="min-h-screen flex items-center justify-center bg-purple-50/40 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-200/60 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-purple-900">{action}</div>
          <div className="w-16 h-1 bg-purple-700 mx-auto mt-2 rounded"></div>{" "}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {action === "Login" ? null : (
            <div className="flex items-center border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50">
              <FaUser className="text-purple-500 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="bg-transparent outline-none flex-1 text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50">
            <FaEnvelope className="text-purple-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent outline-none flex-1 text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50">
            <FaLock className="text-purple-500 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1 text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {action === "Login" ? null : (
            <div className="flex items-center border border-purple-200/60 rounded-lg px-4 py-2 bg-purple-50">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                className="bg-transparent outline-none flex-1 text-sm"
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
                  ? "bg-purple-100 text-purple-600 cursor-default"
                  : "bg-purple-700 text-white hover:bg-purple-800 transition"
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
                  ? "bg-purple-100 text-purple-600 cursor-default"
                  : "bg-purple-700 text-white hover:bg-purple-800 transition"
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
            className="mt-4 w-full py-2 rounded-lg font-semibold bg-purple-700 text-white hover:bg-purple-800 transition disabled:opacity-60"
            disabled={loading}
          >
            {action === "Sign Up" ? "Create account" : "Sign in"}
          </button>
        </form>

        {action === "Sign Up" ? null : (
          <div className="text-sm text-center text-gray-600 mt-4">
            Lost Password?{" "}
            <span
              className="text-purple-700 font-medium cursor-pointer hover:underline"
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
