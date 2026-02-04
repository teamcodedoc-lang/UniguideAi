import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Loader2, GraduationCap, Building2, Banknote, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Scholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/scholarships');
                setScholarships(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching scholarships:", err);
                setError("Failed to load scholarships.");
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#1e3a8a] dark:text-blue-400 font-bold tracking-wider uppercase text-xs mb-3 block">Financial Aid & Support</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-serif mb-6">
                        Govt. Schemes & Scholarships
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Explore various financial aid options provided by the Tamil Nadu Government and other bodies to support your engineering education.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {scholarships.map((scheme, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                            >
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-full mb-3">
                                        {scheme.category || 'Government Scheme'}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                                        {scheme.schemeName}
                                    </h3>
                                </div>

                                <div className="space-y-4 flex-grow">
                                    <div className="flex items-start">
                                        <GraduationCap className="w-5 h-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold">Eligibility</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{scheme.eligibility}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Banknote className="w-5 h-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold">Benefit Amount</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium text-emerald-600 dark:text-emerald-400">
                                                {scheme.amount}
                                            </p>
                                        </div>
                                    </div>

                                    {scheme.incomeLimit && scheme.incomeLimit !== 'No specific income limit' && (
                                        <div className="flex items-start">
                                            <FileText className="w-5 h-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Income Limit</p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">{scheme.incomeLimit}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex justify-between items-center text-xs text-slate-500">
                                        <span>Mode: {scheme.applicationMode}</span>
                                        {scheme.applicableTo && (
                                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                {scheme.applicableTo}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12">
                <p>© 2025 UniGuide Ai. All rights reserved </p>
            </footer>
        </div>
    );
};

export default Scholarships;
