import React from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth.context";
const Footer = () => {
     const { user } = useAuth();
  return (
    <footer className="bg-black/60 border-t border-white/10 pt-10 sm:pt-20 pb-6 sm:pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-5 gap-6 sm:gap-12">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-sm sm:text-2xl font-bold">
                                    SG
                                </div>
                                <span className="text-xl sm:text-3xl font-bold">SmartGuess</span>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Smart Guess betting game that was never before. Challenge friends. Prove your wit.
                            </p>
                        </div>

                        {/* Links */}


                        <div className="flex flex-col">
                            <h4 className="font-semibold mb-1 sm:mb-6 text-lg">Company</h4>
                            <div className="space-y-1 sm:space-y-3 text-gray-400 flex flex-col">
                                <NavLink
                                    to="/"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    About Us
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    Contact
                                </NavLink>

                            
                            </div>
                        </div>
                         <div className="flex flex-col">
                            <h4 className="font-semibold mb-1  sm:mb-6 text-lg">Company</h4>
                            <div className="space-y-1 sm:space-y-3 text-gray-400 flex flex-col">
                                <NavLink
                                    to="/privacy-policy"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    Privacy Policy
                                </NavLink>
                                <NavLink
                                    to="/terms-of-service"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    terms of Service
                                </NavLink>
                                <NavLink
                                    to="/safety-guidelines"
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    Safety Guidelines
                                </NavLink>

                            
                            </div>
                        </div>
                        
                    </div>

                    <div className="mt-10 sm:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                        <p>© 2026 SmartGuess. All rights reserved.</p>
                        <div className="flex gap-8 mt-6 md:mt-0">

                            <a href="#" className="hover:text-gray-300">Twitter</a>
                            <a href="#" className="hover:text-gray-300">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>
  )
}

export default Footer