import React from 'react';
import { MapPin, BookOpen, ExternalLink, BarChart, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResultCard = ({ college, cutoff, tier }) => {
    const navigate = useNavigate();

    // Determine probability label
    const collegeCutoff = parseFloat(college.cutoff) || 0;
    const userCutoff = parseFloat(cutoff); // Don't default to 0 yet, check if valid

    let probability = null;

    if (!isNaN(userCutoff)) {
        const diff = userCutoff - collegeCutoff;
        probability = {
            label: "Stretch Option",
            color: "bg-rose-100 text-rose-800 border-rose-200",
            icon: <TrendingUp className="w-4 h-4 mr-1" />
        };

        if (diff >= 5) {
            probability = {
                label: "High Probability",
                color: "bg-emerald-100 text-emerald-800 border-emerald-200",
                icon: <CheckCircle className="w-4 h-4 mr-1" />
            };
        } else if (diff >= 0) {
            probability = {
                label: "Moderate Chance",
                color: "bg-amber-100 text-amber-800 border-amber-200",
                icon: <BarChart className="w-4 h-4 mr-1" />
            };
        }
    }

    const handleViewDetails = () => {
        // Navigate to details page. Using college.code or _id
        navigate(`/college/${college.code || "1399"}`);
    };

    return (
        <div className="academic-card p-6 flex flex-col md:flex-row gap-6 items-start hover:border-blue-400">
            {/* Visual Identifier (Logo Placeholder) */}
            <div className="w-full md:w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-bold text-slate-400 font-serif">
                    {college.code || "101"}
                </span>
            </div>

            <div className="flex-1 w-full min-w-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold text-[#1e3a8a] dark:text-blue-400 font-serif leading-tight break-words whitespace-normal">
                        {college.name || "Anna University, CEG Campus"}
                    </h3>
                    {probability && (
                        <div className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${probability.color}`}>
                            {probability.icon}
                            {probability.label}
                        </div>
                    )}
                    {!probability && tier && (
                        <div className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-xs font-semibold">
                            {tier}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                        {college.district || "Chennai"}
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1 text-slate-400" />
                        {college.branch || "Computer Science and Engineering"}
                    </div>
                    <div className="flex items-center px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                        Code: {college.code || "1319"}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-t border-slate-100 dark:border-slate-800 text-left">
                    {probability && (
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cutoff</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-white">{college.cutoff || "N/A"}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tier</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100">
                            {tier || "Tier 1"}
                        </span>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            {probability ? "Why Suggested" : "Institution Highlights"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 break-words whitespace-normal leading-relaxed">
                            {probability
                                ? "Matches your cutoff range and district preference."
                                : "Recognized for academic excellence and placement records."}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        onClick={handleViewDetails}
                        className="w-full md:w-auto btn-outline py-2 px-6 shadow-none border-slate-300 dark:border-slate-600 hover:bg-slate-50 text-sm font-semibold"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
