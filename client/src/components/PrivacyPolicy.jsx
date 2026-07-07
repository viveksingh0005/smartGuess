import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../auth.context";
const PrivacyPolicy = () => {
    const user = useAuth();
    return (
        <div className="min-h-screen bg-slate-950 text-white  ">
            <Header />
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-16 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-white/70">
                        Last updated: June 13, 2026
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-4 sm:py-10">
                <div className="prose prose-invert  max-w-none">
                    <p className="text-white/70 text-lg mt-6 sm:mt-10">
                        At SmartGuess, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                        and protect your information when you use our platform.
                    </p>

                    {/* 1. Introduction */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">1. Introduction</h2>
                    <p className="text-white/80">Welcome to Smart Guess. Your privacy matters to us. This Privacy Policy explains what information we collect, how we use it, and what choices you have — in plain language, without legal jargon overload.
                        Smart Guess is a free, strategy-based prediction and guessing game. No real money is involved at any stage. No purchases. No wagers. No financial transactions of any kind.
                        By using Smart Guess, you agree to the practices described in this policy.</p>

                    {/* 2. How We Use Information */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">2. Who we are</h2>
                    <p className="text-white/80">Smart Guess is operated as an online gaming platform offering strategy-based guessing games for entertainment purposes only. If you have questions about this policy, you can reach us at:
                        📧 smartguess@gmail.com

                    </p>

                    {/* 3. Sharing of Information */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">3. Information we collect</h2>
                    <h3> Information you provide</h3>
                    <p className="text-white/80">
                        When you create an account or interact with Smart Guess, you may provide:

                        Username or display name — to identify you within the game
                        Email address — for account creation, login, and communications
                        Password — stored securely in encrypted form; we never see it in plain text
                        Profile preferences — such as notification settings or game preferences

                        We do not collect your real name, phone number, address, or any financial information, as no payments are processed on Smart Guess.
                    </p>
                    <h3> Information collected automatically</h3>
                    <p className="text-white/80">
                        Smart Guess, we may automatically collect:

                        Device information — browser type, operating system, screen resolution
                        Usage data — pages visited, game sessions played, features used, time spent
                        IP address — used for security, fraud prevention, and approximate location (country/region level only)
                        Cookies and similar technologies — to keep you logged in and remember your preferences
                    </p>
                    <h3> Game activity data</h3>
                    <p className="text-white/80">
                        We collect data related to your gameplay, including:

                        Predictions and guesses you submit
                        Game scores, streaks, and performance history
                        Game session timestamps

                        This data is used to power the game, display leaderboards, and improve the experience. It is never used for gambling or financial analysis of any kind.
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white/80 mt-4">
                        <li>Service providers who help us operate the platform (under strict confidentiality)</li>
                        <li>Legal authorities when required by law</li>
                    </ul>

                    <h2 className="text-3xl font-semibold mt-12 mb-4">4. How we use information</h2>
                    <p className="text-white/80"> We use the information collected to:

                        Run and operate the Smart Guess platform
                        Authenticate your account and keep it secure
                        Display your scores, rankings, and game history
                        Send account-related emails (e.g., password reset, important updates)
                        Improve the game through usage analytics and bug tracking
                        Prevent abuse, cheating, or misuse of the platform
                        Comply with applicable laws and regulations

                        We do not use your data to:

                        Serve you targeted ads based on behavioral profiling
                        Sell your information to third parties
                        Make automated decisions that significantly affect you</p>
                    <h2 className="text-3xl font-semibold mt-12 mb-4">4. Cookies and Tracking</h2>
                    <p className="text-white/80"> We use the information collected to:

                        Run and operate the Smart Guess platform
                        Authenticate your account and keep it secure
                        Display your scores, rankings, and game history
                        Send account-related emails (e.g., password reset, important updates)
                        Improve the game through usage analytics and bug tracking
                        Prevent abuse, cheating, or misuse of the platform
                        Comply with applicable laws and regulations

                        We do not use your data to:

                        Serve you targeted ads based on behavioral profiling
                        Sell your information to third parties
                        Make automated decisions that significantly affect you</p>


                    {/* 4. Cookies */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">5. Cookies and Tracking</h2>
                    <p className="text-white/80">
                        Smart Guess uses cookies and similar technologies to keep the platform functional and user-friendly.
                        Cookie TypePurposeEssentialKeep you logged in, maintain session stateFunctionalRemember your preferences and settingsAnalyticsUnderstand how the game is used (aggregated, anonymized)
                        We do not use advertising cookies or third-party tracking pixels.
                        You can manage or disable cookies through your browser settings. Note that disabling essential cookies may prevent you from logging in or using certain features.
                    </p>


                    {/* 5. Data Security */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">6. Data Sharing</h2>
                    <p className="text-white/80">
                        We do not sell your personal data. Ever.
                        We may share limited data only in these situations:

                        Service providers: Trusted third parties who help us run the platform (e.g., hosting, email delivery, analytics) — they are contractually bound to protect your data
                        Legal compliance: If required by law, court order, or to protect the rights and safety of users or the platform
                        Business transfer: If Smart Guess is acquired or merged, your data may transfer to the new operator, who will be bound by this policy
                    </p>

                    {/* 6. Your Rights */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">7. Data Retention</h2>
                    <p className="text-white/80">
                        We keep your account data for as long as your account is active. If you delete your account:

                        Your profile and personal information is removed within 30 days
                        Aggregated, anonymized gameplay statistics may be retained for platform analytics (these cannot be linked back to you)
                    </p>


                    {/* 7. Changes to Policy */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">8. Your Rights and Choices</h2>
                    <p className="text-white/80">
                        Depending on your location, you may have the right to:

                        Access the personal data we hold about you
                        Correct inaccurate data
                        Delete your account and associated data
                        Download a copy of your data (data portability)
                        Opt out of non-essential communications

                        To exercise any of these rights, email us at [email@smartguess.com] with the subject line "Privacy Request." We will respond within 30 days.
                    </p>


                    <h2 className="text-3xl font-semibold mt-12 mb-4">9. Children's Privacy</h2>
                    <p className="text-white/80">
                        Smart Guess is intended for users 13 years of age and older (or 16+ in regions where a higher age threshold applies under local law, such as within the EU under GDPR).
                        We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has created an account, we will promptly delete their information. If you believe a child has registered, please contact us immediately.
                    </p>
                    <h2 className="text-3xl font-semibold mt-12 mb-4">10. Security</h2>
                    <p className="text-white/80">
                        We take reasonable technical and organizational measures to protect your data, including:

                        Encrypted password storage (bcrypt or equivalent)
                        HTTPS encryption for all data in transit
                        Regular security reviews of our platform

                        No system is 100% secure. While we do our best, we cannot guarantee absolute security and are not liable for breaches beyond our reasonable control.
                    </p>
                    <h2 className="text-3xl font-semibold mt-12 mb-4">11. Third-Party Links</h2>
                    <p className="text-white/80">
                        Smart Guess may contain links to external websites or social platforms. This Privacy Policy does not apply to those sites. We encourage you to read the privacy policies of any third-party services you visit.
                    </p>
                    <h2 className="text-3xl font-semibold mt-12 mb-4">10. Changes the Policy</h2>
                    <p className="text-white/80">
                          We may update this Privacy Policy from time to time. When we do:

            We will update the "Last Updated" date at the top
            Significant changes will be communicated via email or an in-app notice
            Continued use of Smart Guess after changes means you accept the updated poicy.
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

export default PrivacyPolicy;