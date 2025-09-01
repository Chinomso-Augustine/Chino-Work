import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { supabase } from "../../supabaseClient"
import { useNavigate } from 'react-router-dom'

const LoginSignUp = () => {
        const navigate = useNavigate(); 

    //1. sign up and Login initial State
    const [action, setAction] = useState("Sign Up"); // This is where we perform action. It's currently on Sign UP which means Login btn is gray

    //2. Form input states 
    //Since initial stats for these inputs are empty, use one useState -> forDate which covers name, email, password, and confirm

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    //3. UI notifications / feedback
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [msg, setMsg] = useState(null);


    //Handler updater
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    //Handle Forgot Password
    const handleForgot = async () => {
        setErr(null);
        setMsg(null);
        if (!formData.email) {
            setErr("Enter your email first");
            return;
        }
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                redirectTo: `${window.location.origin}/auth/reset`,
            });
            if (error) throw error;
            setMsg("Reset link sent. Check your email")
        } catch (e) {
            setErr(e?.message || "Could not sent reset email.")
        }
        finally {
            setLoading(false)
        }
    };

    //Handle submit 
    const handleSubmit = async (e) => {
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
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                        data: { full_name: formData.name },
                    },
                });

                if (error) throw error;
                setMsg("Check your email to confirm your account")

            }
            else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (error) throw error;

                //If work, redirect back to campusconnect
                if (data?.session) {
                  navigate("/"); 
                }
            }
        }
        catch (err) {
            setErr(err?.message || "Authentication failed");
        }
        finally {
            setLoading(false)
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-purple-800">{action}</div>
                    <div className="w-16 h-1 bg-purple-800 mx-auto mt-2 rounded"></div> {/*For line bellow header */}
                </div>

                {/* Input Fields */}
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* If action is Login, we hide the name input by creating empty div, else show everything */}
                    {action === "Login" ? <div></div> :
                        <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                            <FaUser className="text-purple-600 mr-3" />
                            <input
                                type="text"
                                name='name'
                                placeholder="Name"
                                className="bg-transparent outline-none flex-1"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    }

                    <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                        <FaEnvelope className="text-purple-600 mr-3" />
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            className="bg-transparent outline-none flex-1"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                        <FaLock className="text-purple-600 mr-3" />
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            className="bg-transparent outline-none flex-1"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/*confirm password  */}
                    {action == "Login" ? null : (
                        <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                            <FaLock className="text-purple-600 mr-3" />
                            <input
                                type="password"
                                name='confirm'
                                placeholder="Confirm Password"
                                className="bg-transparent outline-none flex-1"
                                value={formData.confirm}
                                onChange={handleChange}
                                required

                            />
                        </div>
                    )}
                    {err && <p className="text-red-600 text-sm">{err}</p>}
                    {msg && <p className="text-green-700 text-sm">{msg}</p>}


                    {/* Dynamic btn change: if action is Login, change Sign Up btn to gray, else do nothing */}
                    {/* Dynamic btn change: if action is Sign Up, change Login btn to gray, else do nothing */}
                    <div className="flex justify-between mt-6 space-x-4">
                        <button
                            type='button'
                            className={`flex-1 py-2 rounded-lg font-semibold ${action === "Login"
                                ? "bg-purple-300 text-gray-700 cursor-default"
                                : "bg-purple-700 text-white hover:bg-purple-800 transition"
                                }`}
                            onClick={() => { setAction("Sign Up") }}
                        >
                            Sign Up
                        </button>
                        <button
                            type='button'
                            className={`flex-1 py-2 rounded-lg font-semibold ${action === "Sign Up"
                                ? "bg-purple-300 text-gray-700 cursor-default"
                                : "bg-purple-700 text-white hover:bg-purple-800 transition"
                                }`}
                            onClick={() => { setAction("Login") }}
                            disabled={loading}
                        >
                            Login
                        </button>
                    </div>

                    <button
                        type='submit'
                        className="mt-4 w-full py-2 rounded-lg font-semibold bg-purple-700 text-white hover:bg-purple-800 transition disabled:opacity-60"
                        disabled={loading}
                    >
                        {action === "Sign Up" ? "Create account" : "Sign in"}

                    </button>
                </form>

                {/**forget password  */}
                {action === "Sign Up" ? null : (
                    <div className='text-sm text-center text-gray-600 mt-4'>
                        Lost Password? {" "}
                        <span
                            className="text-purple-700 font-medium cursor-pointer hover:underline"
                            onClick={handleForgot}>
                            Click Here

                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginSignUp;
