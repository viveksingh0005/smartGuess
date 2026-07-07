import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../auth.context";
const Terms = () => {
    const user = useAuth();
    return (
        <div className="min-h-screen bg-slate-950 text-white  ">
            <Header/>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-16 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-white/70">
                        Last updated: June 13, 2026
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-4 sm:py-10">
                <div className="prose prose-invert max-w-none">
    <p className="text-white/70 text-lg mt-6 sm:mt-10">
        At SmartGuess, we want you to have fun and play fairly. These Terms and Conditions explain the rules for using our platform. Please read them carefully.
    </p>

    {/* 1. Introduction */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">1. Introduction</h2>
    <p className="text-white/80">
        Welcome to Smart Guess! These Terms and Conditions ("Terms") govern your access to and use of the Smart Guess website, mobile app, and related services (collectively, the "Platform").
    </p>
    <p className="text-white/80 mt-4">
        Smart Guess is a <strong>free</strong>, strategy-based prediction and guessing game designed purely for entertainment. No real money is involved. There are no purchases, wagers, bets, or financial transactions of any kind.
    </p>
    <p className="text-white/80 mt-4">
        By accessing or using Smart Guess, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
    </p>

    {/* 2. Who We Are */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">2. Who We Are</h2>
    <p className="text-white/80">
        Smart Guess is an online entertainment platform offering fun, skill-based guessing games. Questions about these Terms? Contact us at:
        📧 smartguess@gmail.com
    </p>

    {/* 3. User Accounts */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">3. User Accounts</h2>
    <p className="text-white/80">
        To access certain features, you may need to create an account. You agree to:
    </p>
    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
        <li>Provide accurate and complete information</li>
        <li>Keep your password secure and confidential</li>
        <li>Notify us immediately of any unauthorized use of your account</li>
        <li>Be at least 13 years old (or the minimum age required in your country)</li>
    </ul>
    <p className="text-white/80 mt-4">
        You are responsible for all activities that occur under your account.
    </p>

    {/* 4. Game Rules */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">4. Game Rules and Conduct</h2>
    <p className="text-white/80">
        You agree to use Smart Guess only for lawful and fair purposes. Prohibited activities include:
    </p>
    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
        <li>Cheating, hacking, exploiting bugs, or using unauthorized automation/scripts</li>
        <li>Harassing, abusing, or threatening other players</li>
        <li>Impersonating others or creating multiple accounts to manipulate leaderboards</li>
        <li>Attempting to gain unauthorized access to the Platform or other users' accounts</li>
        <li>Sharing or promoting illegal content, spam, or malware</li>
    </ul>

    {/* 5. Intellectual Property */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">5. Intellectual Property</h2>
    <p className="text-white/80">
        All content, design, graphics, logos, and game mechanics on Smart Guess are owned by us or our licensors and protected by copyright, trademark, and other intellectual property laws.
    </p>
    <p className="text-white/80 mt-4">
        You may not copy, modify, distribute, or create derivative works without our prior written permission. Limited personal, non-commercial use is allowed while using the Platform.
    </p>

    {/* 6. No Real Money / Entertainment Only */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">6. No Real Money Involved</h2>
    <p className="text-white/80">
        Smart Guess is strictly for entertainment. No real currency, cryptocurrencies, or items of value are wagered, won, or lost. All scores, streaks, and leaderboards are for fun and have no monetary value.
    </p>

    {/* 7. Disclaimers */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">7. Disclaimers and Limitation of Liability</h2>
    <p className="text-white/80">
        The Platform is provided "as is" without any warranties. We do not guarantee uninterrupted access, error-free operation, or that the game will meet your expectations.
    </p>
    <p className="text-white/80 mt-4">
        To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of Smart Guess.
    </p>

    {/* 8. Termination */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">8. Termination</h2>
    <p className="text-white/80">
        We may suspend or terminate your account at any time, with or without notice, if you violate these Terms or engage in prohibited behavior.
    </p>
    <p className="text-white/80 mt-4">
        You may delete your account at any time through the app settings or by contacting us.
    </p>

    {/* 9. Changes to Terms */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">9. Changes to These Terms</h2>
    <p className="text-white/80">
        We may update these Terms from time to time. We will notify you of significant changes via email or an in-app notice. Continued use of Smart Guess after changes means you accept the updated Terms.
    </p>
    <p className="text-white/80 mt-4">
        Last Updated: July 2026
    </p>

    {/* 10. Governing Law */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">10. Governing Law</h2>
    <p className="text-white/80">
        These Terms are governed by the laws of [Your Country/Jurisdiction]. Any disputes shall be resolved in the courts of that jurisdiction.
    </p>

    {/* 11. Contact */}
    <h2 className="text-3xl font-semibold mt-12 mb-4">11. Contact Us</h2>
    <p className="text-white/80">
        If you have any questions about these Terms, please reach out to us at:
        📧 smartguess@gmail.com
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
            <Footer/>
        </div>
    );
};

export default Terms;