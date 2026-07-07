import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Home, X } from "lucide-react";
import { useAuth } from '../auth.context';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);
     const handleLogout = () => {
        try {
            logout();
            setIsMenuOpen(false);
            setStatusMsg({ type: 'success', text: 'Logged out successfully 👋' });

            setTimeout(() => {
                setStatusMsg(null);
                navigate('/');
            }, 1200);
        } catch (err) {
            setStatusMsg({ type: 'error', text: 'Something went wrong, please try again' });
            setTimeout(() => setStatusMsg(null), 2000);
        }
    };
    return (
        <>
       
        <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-slate-950/90 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-2 sm:py-5 flex items-center justify-between">

                {/* Logo - Kept exactly the same */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-sm sm:text-2xl font-bold shadow-lg">
                        SG
                    </div>
                    <div>
                        <span className="text-medium sm:text-2xl font-bold tracking-tight">SmartGuess</span>
                    </div>
                </div>

                <Link to="/" className='hidden md:block px-6 py-3 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/10 transition-all duration-300'>
                    <Home />
                </Link>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="px-6 py-3 text-white/90 font-medium rounded-2xl bg-white/20 border border-white/30 hover:bg-white/10 transition-all duration-300">
                                {user?.name || user?.username || "User"}
                            </span>

                            <button
                                onClick={handleLogout}   // ← Updated
                                className="px-6 py-3 text-white/90 font-medium rounded-2xl bg-white/20 border border-white/30 hover:text-red-400 hover:border-red-400 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-3 text-white/90 font-medium rounded-2xl bg-white/20 border border-white/30 hover:bg-white/10 transition-all duration-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="px-6 py-3 text-white/90 font-medium rounded-2xl bg-white/20 border border-white/30 hover:bg-white/10 transition-all duration-300"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-3 text-white hover:bg-white/10 rounded-2xl transition-all"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="px-6 py-8 flex flex-col gap-6 text-lg">
                        {user ? (
                            <>
                                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 mb-4 text-center">
                                    <span className="text-white/90 font-medium ">
                                        {user?.name || user?.username || "User"}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full py-4 rounded-2xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-center"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full py-4 rounded-2xl hover:bg-white/10 transition-all text-center"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/register");
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
        {statusMsg && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300"
                     style={{
                         backgroundColor: statusMsg.type === 'success' ? '#22c55e' : '#ef4444',
                         color: 'white'
                     }}>
                    {statusMsg.text}
                </div>
            )}
        </>
    )
}

export default Header