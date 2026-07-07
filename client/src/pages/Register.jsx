import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Gamepad2, User, Mail, Lock, Sparkles, CheckCircle, XCircle } from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);

    const { handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMsg(null);

        try {
            await handleRegister({ name, email, password });
            
            setStatusMsg({
                type: "success",
                text: "Account created successfully 🎮",
                icon: CheckCircle
            });

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            setStatusMsg({
                type: "error",
                text: err.response?.data?.message || "Registration failed. Please try again.",
                icon: XCircle
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/google`,
                { token: credentialResponse.credential },
                { withCredentials: true }
            );

            if (res.data.success) {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("Google sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden px-4 py-4 md:py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* Neon Glow Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header Card */}
                <div className="text-center mb-3 md:mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 via-violet-600 to-cyan-500 rounded-2xl mb-2 md:mb-4 shadow-2xl shadow-purple-500/50">
                        <Gamepad2  className="text-white size-5 md:size-10 lg:size-14"  />
                    </div>
                 
                  
                </div>

                {/* Main Form Card */}
                <div className="bg-[#12121a] border border-white/10 rounded-3xl p-4 md:p-10 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl md:text-3xl font-bold text-white text-center mb-4 md:mb-8 flex items-center justify-center gap-3">
                        Create Account
                        <Sparkles className="text-yellow-400" />
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3 md:pace-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <User size={16} /> USERNAME
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your epic username"
                                    className="w-full px-5 py-2 md:py-4 bg-[#1a1a24] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Mail size={16} /> EMAIL
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@game.com"
                                    className="w-full px-5 py-2 md:py-4 bg-[#1a1a24] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Lock size={16} /> PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-2 md:py-4 bg-[#1a1a24] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 md:py-4 mt-3 md:mt-4 bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 rounded-xl md:rounded-2xl font-bold text-md md:text-g tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/40 disabled:opacity-70"
                        >
                            {isLoading ? "CREATING ACCOUNT..." : "JOIN THE BATTLE"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-2 md:my-4 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                        <span className="text-gray-500 text-sm font-medium">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                    </div>

                   

                    {error && (
                        <p className="text-red-500 text-center mt-6 bg-red-500/10 border border-red-500/30 py-3 rounded-2xl">
                            {error}
                        </p>
                    )}
                     <p className="text-center text-gray-500 text-sm mt-2 md:mt-6">
                    Already have an account?{" "}
                    <span 
                        onClick={() => navigate("/login")} 
                        className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
                    >
                        Sign in
                    </span>
                </p>

                 {statusMsg && (
                                    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white transition-all duration-300 ${
                                        statusMsg.type === 'success' 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                                            : 'bg-gradient-to-r from-red-500 to-rose-600'
                                    }`}>
                                        {statusMsg.icon && React.createElement(statusMsg.icon, { size: 22 })}
                                        <span className="font-medium">{statusMsg.text}</span>
                                    </div>
                                )}
                </div>

               
            </div>
        </div>
    );
};

export default Register;