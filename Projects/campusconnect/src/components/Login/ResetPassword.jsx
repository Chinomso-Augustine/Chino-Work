import React, { useState } from "react";
import { supabase } from "../../supabaseClient";


{/**
Functionality: 
1. Allow user to enter new password
2. Call supabase.auth.updateUser({password}) 
3. Redirect user back to login page after success*/}
const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setErr(null); setMsg(null);

        if (password !== confirm) {
            setErr("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            setMsg("Password updated! You can now log in.");
            // redirect back to login after short delay
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (e) {
            setErr(e?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
                    Reset Password
                </h2>
                <form className="space-y-4" onSubmit={handleReset}>
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border rounded-lg px-4 py-2 bg-purple-50 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border rounded-lg px-4 py-2 bg-purple-50 outline-none"
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
