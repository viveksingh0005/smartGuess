import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Zap, Users, Trophy, Shield, Star } from "lucide-react";
import GameRules from "./GameRules";
import Footer from "../components/Footer";
import { useAuth } from "../auth.context";
import Header from "../components/Header";
import CreateJoinRoom from "./CreateJoinRoom";
const Dashboard = () => {
    const { user } = useAuth();

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className=" bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
            {/* Navigation */}

            <Header />

            {/* HERO SECTION */}
            <section className="py-6 md:py-14 lg:py-20  px-6 relative flex items-center ">
                {/* Background Effects */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-5 py-2 rounded-full mb-8 border border-white/20">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium tracking-widest">LIVE BATTLES • </span>
                    </div>

                    <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
                        bet and win.<br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">betting game only smarter will win.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-12">
                        Create private rooms, challenge friends, and show who is the real boss.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        {user ? (<button
                            onClick={() => navigate("/cr")}
                            className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30"
                        >
                            Start Playing Now
                            <Zap className="group-hover:rotate-12 transition-transform" />
                        </button>) : (<button
                            onClick={() => navigate("/register")}
                            className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-yellow-600 text-lg font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30"
                        >
                            Start Playing Now
                            <Zap className="group-hover:rotate-12 transition-transform" />
                        </button>)}

                        <button
                            onClick={() => {
                                document
                                    .getElementById("game-rules")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                            }}
                            className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-red-600 to-yellow-600 text-lg font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30"
                        >
                            Game Rules
                            <Zap className="group-hover:rotate-12 transition-transform" />
                        </button>


                    </div>



                </div>


            </section>
            <CreateJoinRoom />
            {/* FEATURES SECTION */}
            <section id="features" className="py-10 sm:py-24 px-6 bg-black/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-6 sm:mb-16">
                        <h2 className="text-3xl sm:text-5xl font-bold mb-4">Why TruthBet?</h2>
                        <p className="text-gray-400 max-w-md mx-auto">Built for fast-paced, competitive, and fun truth gaming</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-purple-500/50 transition-all group">
                            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-8 text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                                ⚡
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Lightning Fast</h3>
                            <p className="text-gray-400">Real-time multiplayer with zero lag. Answer before your opponent and steal points.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-purple-500/50 transition-all group">
                            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-8 text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                                👥
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Private Rooms</h3>
                            <p className="text-gray-400">Invite friends or join public lobbies. Perfect for parties, teams, or solo ranking.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-purple-500/50 transition-all group">
                            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-8 text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                                🏆
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Global Leaderboard</h3>
                            <p className="text-gray-400">Compete for the #1 spot. Weekly tournaments and seasonal rewards.</p>
                        </div>
                    </div>
                </div>
            </section>
            <>
                <div
                    id="game-rules"
                    className="scroll-mt-24"
                >
                    <GameRules />
                </div>
            </>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Dashboard;