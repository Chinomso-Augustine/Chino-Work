import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginSignUp = () => {
    const [action, setAction] = useState("Sign Up"); // This is where we perform action. It's currently on Sign UP which means Login btn is gray

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-purple-800">{action}</div>
                    <div className="w-16 h-1 bg-purple-800 mx-auto mt-2 rounded"></div> {/*For line bellow header */}
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    {/* If action is Login, we hide the name input by creating empty div, else show everything */}
                    {action === "Login" ? <div></div> :
                        <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                            <FaUser className="text-purple-600 mr-3" />
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-transparent outline-none flex-1"
                            />
                        </div>
                    }

                    <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                        <FaEnvelope className="text-purple-600 mr-3" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-transparent outline-none flex-1"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                        <FaLock className="text-purple-600 mr-3" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent outline-none flex-1"
                        />
                    </div>
                     <div className="flex items-center border rounded-lg px-4 py-2 bg-purple-50">
                        <FaLock className="text-purple-600 mr-3" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-transparent outline-none flex-1"
                        />
                    </div>
                </div>

                {/* Dynamic btn change: if action is Login, change Sign Up btn to gray, else do nothing */}
                {/* Dynamic btn change: if action is Sign Up, change Login btn to gray, else do nothing */}
                <div className="flex justify-between mt-6 space-x-4">
                    <button
                        className={`flex-1 py-2 rounded-lg font-semibold ${
                            action === "Login"
                                ? "bg-purple-300 text-gray-700 cursor-default"
                                : "bg-purple-700 text-white hover:bg-purple-800 transition"
                        }`}
                        onClick={() => { setAction("Sign Up") }}
                    >
                        Sign Up
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg font-semibold ${
                            action === "Sign Up"
                                ? "bg-purple-300 text-gray-700 cursor-default"
                                : "bg-purple-700 text-white hover:bg-purple-800 transition"
                        }`}
                        onClick={() => { setAction("Login") }}
                    >
                        Login
                    </button>
                </div>

                {/* If action is Sign Up, we hide forgot password section */}
                {action === "Sign Up" ? <div></div> :
                    <div className='text-sm text-center text-gray-600 mt-4'>
                        Lost Password? <span className="text-purple-700 font-medium cursor-pointer hover:underline">Click Here</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginSignUp;
