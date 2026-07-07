import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth.context";
import Footer from "./Footer";
import Header from "./Header";
const Contact = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const [copied, setCopied] = useState(false);
const handleCopyEmail = () => {
  navigator.clipboard.writeText('hellosmartguess@gmail.com');
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status); // For debugging

            // Check if response is ok before trying to parse JSON
            if (!response.ok) {
                // Try to get error message even if not JSON
                let errorMsg = `Server error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error || errorMsg;
                } catch (_) { }

                throw new Error(errorMsg);
            }

            const data = await response.json();

            setStatus({
                type: "success",
                message: "Thank you! Your message has been sent successfully."
            });

            setFormData({ name: "", email: "", subject: "", message: "" });

        } catch (error) {
            console.error("Submit Error:", error);

            setStatus({
                type: "error",
                message: error.message || "Failed to send message. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white ">
            <Header />
            {/* Hero */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-6 sm:py-16">
                
                 <div className="max-w-5xl mx-auto px-6 text-center">
                        <h1 className=" text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-6">
                            Get in Touch 
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Have questions? Want to collaborate? We're here to help.
                        </p>
                    </div>
            </div>

            <div className="max-w-6xl mx-auto px-2 sm:px-6 py-10 sm:py-16">
                <div className="grid md:grid-cols-5 gap-12">

                    {/* Contact Form */}
                    <div className="md:col-span-3">
                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-4 md:p-10">
                            <h2 className="text-xl sm:text-3xl font-semibold mb-2 sm:mb-8">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-1 sm:py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-1 sm:py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-800 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-1 sm:py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={8}
                                        className="w-full bg-slate-800 border border-white/10 rounded-3xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                        placeholder="Write your message here..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>

                                {status.message && (
                                    <p className={`text-center font-medium mt-4 p-3 rounded-2xl ${status.type === "success"
                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                                        }`}>
                                        {status.message}
                                    </p>
                                )}

                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-purple-400" />
                                    </div>
                                     <div>
    <p className="text-white/60 text-sm">Email</p>
    <button
      onClick={handleCopyEmail}
      className="text-white hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2"
    >
      hellosmartguess@gmail.com
      <span className="text-xs text-white/50">
        {copied ? '✅ Copied!' : '📋'}
      </span>
    </button>
  </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Phone</p>
                                        <a href="tel:+919528005226" className="hover:text-purple-400 transition-colors">
                                            +91 95280-05226
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Office</p>
                                        <p className="text-white/80">
                                            1 Room Chair<br />
                                            Home
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Support Hours</p>
                                        <p className="text-white/80">Monday - Friday, 6 PM - 7 PM IST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8">
                            <h4 className="font-semibold mb-4">Contact us for</h4>
                            <div className="space-y-3 text-white/70">
                                <p className="hover:text-white cursor-pointer">→ Technical Issue</p>
                                <p className="hover:text-white cursor-pointer">→ Collaboration</p>
                                <p className="hover:text-white cursor-pointer">→ Reporting a Bug</p>
                            </div>
                        </div>
                    </div>
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
            <Footer />
        </div>
    );
};

export default Contact;