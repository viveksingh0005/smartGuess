import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../auth.context";
const Disclaimer = () => {
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
                    <p className="text-white/70 text-lg mt-10">
                        Welcome to SmartGuess. By accessing or using our platform, you agree to be bound by these Terms of Service.
                    </p>

                    {/* 1. Acceptance */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-white/80">
                        These Terms of Service ("Terms") govern your access to and use of SmartGuess website, services, and applications. 
                        If you do not agree to these Terms, you may not use our services.
                    </p>

                    {/* 2. User Accounts */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">2. User Accounts</h2>
                    <ul className="list-disc pl-6 space-y-3 text-white/80">
                        <li>You must be at least 13 years old to use our service.</li>
                        <li>You are responsible for maintaining the confidentiality of your account.</li>
                        <li>You agree to provide accurate and complete information.</li>
                        <li>You are solely responsible for all activities under your account.</li>
                    </ul>

                    {/* 3. User Conduct */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">3. Acceptable Use</h2>
                    <p className="text-white/80 mb-4">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-3 text-white/80">
                        <li>Use the service for any illegal purpose</li>
                        <li>Attempt to gain unauthorized access to any part of the platform</li>
                        <li>Interfere with or disrupt the service</li>
                        <li>Upload harmful code, viruses, or malicious content</li>
                        <li>Harass, threaten, or impersonate others</li>
                    </ul>

                    {/* 4. Intellectual Property */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">4. Intellectual Property</h2>
                    <p className="text-white/80">
                        All content, features, and functionality on SmartGuess are owned by us or our licensors and are protected by copyright, 
                        trademark, and other intellectual property laws.
                    </p>

                    {/* 5. Predictions & Accuracy */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">5. Predictions and Accuracy</h2>
                    <p className="text-white/80">
                        SmartGuess provides prediction tools for informational and entertainment purposes only. 
                        We do not guarantee the accuracy of any predictions. You use our service at your own risk.
                    </p>

                    {/* 6. Termination */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">6. Termination</h2>
                    <p className="text-white/80">
                        We reserve the right to suspend or terminate your account at any time, with or without notice, 
                        for conduct that we believe violates these Terms.
                    </p>

                    {/* 7. Disclaimers */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">7. Disclaimers</h2>
                    <p className="text-white/80">
                        The service is provided "as is" without any warranties. We are not liable for any damages arising from your use of the platform.
                    </p>

                    {/* 8. Limitation of Liability */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">8. Limitation of Liability</h2>
                    <p className="text-white/80">
                        In no event shall SmartGuess be liable for any indirect, incidental, special, consequential, or punitive damages.
                    </p>

                    {/* 9. Changes to Terms */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">9. Changes to Terms</h2>
                    <p className="text-white/80">
                        We may update these Terms from time to time. We will notify you of significant changes by posting the new Terms on this page.
                        Continued use of the service after changes constitutes acceptance of the new Terms.
                    </p>

                    {/* 10. Contact Us */}
                    <h2 className="text-3xl font-semibold mt-12 mb-4">10. Contact Us</h2>
                    <p className="text-white/80">
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <div className="mt-6 mb-6 p-6 bg-slate-900 rounded-3xl border border-white/10">
                        <p className="font-medium">Email: legal@smartguess.com</p>
                    </div>
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

export default Disclaimer;