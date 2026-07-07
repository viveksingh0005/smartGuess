import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Eye, EyeOff,CheckCircle, XCircle } from "lucide-react";

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg(null);

        const result = await handleLogin({ email, password });

        if (result?.success) {
            setStatusMsg({
                type: "success",
                text: "Login successful! Welcome back 🎮",
                icon: CheckCircle
            });

            setTimeout(() => {
                navigate('/');
            }, 1200);
        } else {
            setStatusMsg({
                type: "error",
                text: result?.message || "Invalid email or password",
                icon: XCircle
            });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 py-4 md:py-12">
            
            {/* Background Glow Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#7c3aed30_0%,transparent_70%)]"></div>

            <div className="relative w-full max-w-md">
                {/* Logo / Header */}
                <div className="flex flex-col items-center mb-4 md:mb-10">
                    
                    <h1 className="text-lg md:text-4xl font-bold text-white tracking-tight">Welcome Back</h1>
                   
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 md:p-10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-5 py-2 md:py-4 bg-white/10 border border-white/20 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-5 py-2 md:py-4 bg-white/10 border border-white/20 rounded-xl md:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        {/* <div className="text-right">
                            <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                                Forgot Password?
                            </Link>
                        </div> */}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-md md:text-lg text-white hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-2 md:my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <Link 
                                to="/register" 
                                className="text-green-600 hover:text-purple-300 font-medium transition-colors"
                            >
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>

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
    );
};

export default Login;