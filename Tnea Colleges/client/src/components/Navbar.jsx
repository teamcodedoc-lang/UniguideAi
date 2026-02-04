import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo_icon.png';
import './Logo.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Theme Toggle
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleNavClick = (id) => {
        setIsMobileMenuOpen(false); // Close mobile menu if open

        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (location.pathname !== '/') navigate('/');
            return;
        }

        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/', { state: { scrollTo: id } });
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo - Matching Tier System Cleanliness */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src={logo} alt="UniGuide AI Logo" className="h-16 w-auto object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-none tracking-tight">
                                UniGuide <span className="text-[#1e3a8a] dark:text-blue-400">Ai</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                                Academic Predictor
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu - Clean & Bordered */}
                    <div className="hidden md:flex items-center h-full">
                        <div className="flex items-center space-x-1 h-full mr-8">
                            <button onClick={() => handleNavClick('home')} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                Home
                            </button>
                            <button onClick={() => handleNavClick('features')} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                Features
                            </button>
                            <button onClick={() => handleNavClick('tiers')} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                Colleges
                            </button>
                            <Link to="/scholarships" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                Scholarships
                            </Link>
                            <Link to="/choice-filling" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                AI Choice Filler
                            </Link>
                            <button onClick={() => handleNavClick('predictor')} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#1e3a8a] hover:bg-slate-50 rounded-md transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900">
                                Predictor
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 pl-8 border-l border-slate-200 dark:border-slate-800 h-10">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {currentUser ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        {currentUser.photoURL ? (
                                            <img src={currentUser.photoURL} alt="User" className="w-8 h-8 rounded-full border border-slate-200" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                                                {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden lg:block">
                                            {currentUser.displayName?.split(' ')[0]}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleSignIn}
                                    className="bg-[#1e3a8a] hover:bg-[#172554] text-white text-sm font-semibold px-5 py-2.5 rounded shadow-sm hover:shadow transition-all flex items-center"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-900 dark:text-white"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg absolute w-full"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col">
                            <button onClick={() => handleNavClick('home')} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">Home</button>
                            <button onClick={() => handleNavClick('features')} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">Features</button>
                            <button onClick={() => handleNavClick('tiers')} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">Colleges</button>
                            <Link to="/scholarships" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">Scholarships</Link>
                            <Link to="/choice-filling" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">AI Choice Filler</Link>
                            <button onClick={() => handleNavClick('predictor')} className="text-slate-700 dark:text-slate-300 font-bold text-lg text-left px-2">Predictor</button>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                {currentUser ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 px-2">
                                            {currentUser.photoURL && (
                                                <img src={currentUser.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                                            )}
                                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                                {currentUser.displayName}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full text-left px-2 py-2 text-red-600 font-bold"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleSignIn();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-[#1e3a8a] text-white py-3 rounded font-bold"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
