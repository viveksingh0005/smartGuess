import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../auth.context";
const Safety = () => {
    const user = useAuth();
    return (
        <div className="min-h-screen bg-slate-950 text-white  ">
            <Header />
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-16 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        Safety Guidelines
                    </h1>
                    <p className="text-xl text-white/70">
                        Last updated: June 13, 2026
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-4 sm:py-10">
                <div className="prose prose-invert max-w-none">
                    <p className="text-white/70 text-lg mt-6 sm:mt-10">
                        At SmartGuess, your safety and well-being come first. These Safety Guidelines explain how we work to keep the platform fun, respectful, and secure for everyone.
                    </p>

                    {/* 1. Introduction */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">1. Introduction</h2>
                    <p className="text-white/80">
                        Smart Guess is a free, strategy-based guessing game meant for entertainment only. We are committed to providing a safe, positive, and inclusive environment for all players.
                        These Safety Guidelines outline our expectations and the steps we take to protect our community.
                    </p>

                    {/* 2. Our Commitment */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">2. Our Commitment to Safety</h2>
                    <p className="text-white/80">
                        We strive to maintain a welcoming space free from harassment, toxicity, and harmful behavior. We actively monitor the platform and take action against violations of our rules.
                    </p>

                    {/* 3. Respectful Community */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">3. Respectful Community & Behavior</h2>
                    <p className="text-white/80">We expect all players to:</p>
                    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
                        <li>Treat other players with kindness and respect</li>
                        <li>Avoid hate speech, discrimination, bullying, or harassment based on race, gender, religion, nationality, or any other personal characteristic</li>
                        <li>Refrain from using offensive, vulgar, or inappropriate language</li>
                        <li>Keep game chat and discussions civil and game-related</li>
                    </ul>

                    {/* 4. Responsible Gaming */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">4. Responsible Gaming</h2>
                    <p className="text-white/80">
                        Even though Smart Guess involves no real money, we encourage healthy gaming habits:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
                        <li>Take regular breaks and avoid playing for excessively long periods</li>
                        <li>Balance gaming with other activities in your daily life</li>
                        <li>If you feel frustrated, angry, or anxious while playing, step away and return later</li>
                        <li>Remember: it’s just a game — winning and losing are part of the fun</li>
                    </ul>

                    {/* 5. Fair Play */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">5. Fair Play</h2>
                    <p className="text-white/80">
                        Cheating ruins the experience for everyone. Prohibited actions include using bots, scripts, multiple accounts to manipulate rankings, exploiting bugs, or any other unfair advantage.
                    </p>

                    {/* 6. Reporting Issues */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">6. Reporting Problems</h2>
                    <p className="text-white/80">
                        If you encounter harassment, inappropriate behavior, cheating, or any other safety concern, please report it immediately.
                        You can report directly from the game (through player profiles or chat) or email us at:
                    </p>
                    <p className="text-white/80 mt-3 font-medium">📧 smartguess@gmail.com</p>
                    <p className="text-white/80 mt-4">
                        We review every report seriously and take appropriate action, which may include warnings, temporary suspensions, or permanent bans.
                    </p>

                    {/* 7. Account Security */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">7. Protecting Your Account</h2>
                    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
                        <li>Use a strong, unique password</li>
                        <li>Never share your login credentials with anyone</li>
                        <li>Be cautious of phishing attempts or suspicious links</li>
                        <li>Log out after using shared devices</li>
                    </ul>

                    {/* 8. Age Guidelines */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">8. Age Guidelines</h2>
                    <p className="text-white/80">
                        Smart Guess is intended for users aged 13 and above (or the minimum legal age in your region). Parents and guardians are encouraged to supervise younger users and discuss safe internet practices with them.
                    </p>

                    {/* 9. Content and Links */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">9. Third-Party Links & External Content</h2>
                    <p className="text-white/80">
                        Be cautious when interacting with links shared by other players. We are not responsible for external websites, and we strongly recommend not sharing personal information with strangers.
                    </p>

                    {/* 10. Changes & Contact */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">10. Contact for Safety Concerns</h2>
                    <p className="text-white/80">
                        Your safety is important to us. If you have any questions or concerns about these guidelines, feel unsafe, or need help, please reach out to us at:
                        <span className="block mt-3 font-medium">📧 smartguess@gmail.com</span>
                    </p>
                    <p className="text-white/80 mt-6">
                        We’re here to help make Smart Guess a safe and enjoyable place for everyone.
                    </p>
                </div>

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
            <Footer />
        </div>
    );
};

export default Safety;