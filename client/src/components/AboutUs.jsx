import { Users, Target, Award, Heart } from "lucide-react";
import { useAuth } from "../auth.context";
import Footer from "./Footer";
import Header from "./Header";

const AboutUs = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
          <Header/>
            {/* Main Content */}
            <div className="flex-1">
                {/* Hero Section */}
                <div className="py-6 sm:py-16 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h1 className=" text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-6">
                            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">SmartGuess</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Making intelligent predictions smarter, one guess at a time.
                        </p>
                    </div>
                </div>

                {/* Our Story */}
                <div className="py-6 sm:py-20 border-b border-white/10">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6">Our Story</h2>
                                <div className="space-y-3 sm:space-y-6 text-white/80 text-lg">
                                    <p>
                                        Founded in 2026, SmartGuess was born from a simple idea: 
                                        <span className="text-purple-400"> predictions should be smart, not random.</span>
                                    </p>
                                    <p>
                                        What started as a small side project has grown into a platform 
                                        trusted by thousands of users who want to play games with not just random guess but a choice they think smart.
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-3xl overflow-hidden border border-white/10">
                                <img 
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" 
                                    alt="Team working"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="py-6 sm:py-20 bg-slate-900/50">
                    <div className="max-w-5xl mx-auto px-3 sm:px-6">
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-10">
                            <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-4 sm:p-10">
                                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                                    <Target className="w-10 h-10 text-blue-500" />
                                    <h3 className="text-xl sm:text-3xl font-semibold">Our Mission</h3>
                                </div>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    To provide the best platform where gamers can enjoy poker and predictions 
                                    based on smart choices rather than pure luck.
                                </p>
                            </div>

                            <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-4 sm:p-10">
                                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                                    <Award className="w-10 h-10 text-purple-500" />
                                    <h3 className="text-xl sm:text-3xl font-semibold">Our Vision</h3>
                                </div>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    A world where every important decision is backed by clarity, 
                                    confidence, and intelligent insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="py-6 sm:py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-xl sm:text-3xl font-semibold">Our Values</h2>
                            <p className="text-white/60">What drives us every day</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Heart, title: "User First", desc: "Every feature is built for you." },
                                { icon: Users, title: "Collaboration", desc: "Great predictions come from great teams." },
                                { icon: Target, title: "Precision", desc: "Accuracy over everything." },
                                { icon: Award, title: "Innovation", desc: "Pushing the boundaries of prediction tech." }
                            ].map((value, i) => (
                                <div key={i} className="bg-slate-900 border border-white/10 rounded-3xl p-4 sm:p-8 hover:border-purple-500/30 transition-all group">
                                    <value.icon className="w-10 h-10 text-purple-400 mb-3 sm:mb-6 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-3">{value.title}</h4>
                                    <p className="text-white/70">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-8 sm:py-24 text-center bg-gradient-to-br from-slate-900 to-purple-950">
                    <div className="max-w-2xl mx-auto px-6">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-6">Ready to make smarter guesses?</h2>
                        <p className="text-xl text-white/70 mb-4 sm:mb-10">
                            Join thousands of users who are already predicting better.
                        </p>
                        
                        {user ? (
                            <button 
                                onClick={() => window.location.href = '/cr'}
                                className=" px-6 sm:px-10 py-2 sm:py-4 bg-gradient-to-r from-red-600 to-yellow-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all"
                            >
                                Play Now
                            </button>
                        ) : (
                            <button 
                                onClick={() => window.location.href = '/register'}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all"
                            >
                                Get Started Free
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer - Now properly placed */}
            <Footer />
        </div>
    );
};

export default AboutUs;