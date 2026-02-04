import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calculator, ArrowRight, Loader2 } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

const PredictorForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cutoff: '',
        category: 'OC',
        preferredBranch: 'All Branches',
        district: 'All Districts'
    });

    const [categories, setCategories] = useState(['OC', 'BC', 'BCM', 'MBC', 'DNC', 'SC', 'SCA', 'ST']);
    const [branches, setBranches] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                // Use explicit IP to avoid localhost resolution issues
                const response = await axios.get('http://127.0.0.1:5000/api/filters');
                if (response.data) {
                    if (response.data.branches && response.data.branches.length > 0) {
                        setBranches(['All Branches', ...response.data.branches]);
                    }
                    if (response.data.districts && response.data.districts.length > 0) {
                        setDistricts(['All Districts', ...response.data.districts]);
                    }
                    if (response.data.categories && response.data.categories.length > 0) {
                        setCategories(response.data.categories);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch filters, using fallbacks:", error);
                // Fallbacks
                setBranches(['All Branches', 'COMPUTER SCIENCE AND ENGINEERING', 'INFORMATION TECHNOLOGY', 'ELECTRONICS AND COMMUNICATION ENGINEERING']);
                setDistricts(['All Districts', 'Chennai', 'Coimbatore', 'Madurai']);
            }
        };

        fetchFilters();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Calculate cutoff: Maths + (Physics/2) + (Chemistry/2)
            const p = parseFloat(formData.physics) || 0;
            const c = parseFloat(formData.chemistry) || 0;
            const m = parseFloat(formData.maths) || 0;

            // Explicit calculation as requested by user to ensure accuracy
            const calculatedCutoff = (m + (p / 2) + (c / 2)).toFixed(2);

            const payload = { ...formData, cutoff: calculatedCutoff };

            // Simulate API logic or actual call if backend is ready
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Pass calculated payload
            navigate('/results', { state: payload });
        } catch (error) {
            console.error("Prediction Error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="predictor" className="py-20 bg-white dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="academic-card p-8 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
                    {/* Decorative Top header */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#1e3a8a]"></div>

                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-slate-800 rounded-full mb-4 text-[#1e3a8a] dark:text-blue-400">
                            <Calculator className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-2">College Predictor Tool</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                            Enter your academic details below to discover which universities and colleges you are eligible for based on previous years' cutoff trends.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* PCM Inputs - Replaces Single Cutoff */}
                            <div className="space-y-4 md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Academic Marks (Out of 100)
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500 uppercase">Maths</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            required
                                            className="input-academic text-center font-mono font-bold"
                                            placeholder="100"
                                            value={formData.maths || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                                                    setFormData({ ...formData, maths: val });
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500 uppercase">Physics</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            required
                                            className="input-academic text-center font-mono font-bold"
                                            placeholder="100"
                                            value={formData.physics || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                                                    setFormData({ ...formData, physics: val });
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500 uppercase">Chemistry</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            required
                                            className="input-academic text-center font-mono font-bold"
                                            placeholder="100"
                                            value={formData.chemistry || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                                                    setFormData({ ...formData, chemistry: val });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    *Enter marks out of 100. Cutoff will be calculated as: Maths + (Physics/2) + (Chemistry/2).
                                </p>
                            </div>

                            {/* Category Select */}
                            <CustomDropdown
                                label="Community Category"
                                value={formData.category}
                                options={categories}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />

                            {/* Branch Select */}
                            <CustomDropdown
                                label="Preferred Branch"
                                value={formData.preferredBranch}
                                options={branches}
                                onChange={(e) => setFormData({ ...formData, preferredBranch: e.target.value })}
                            />

                            {/* District Select */}
                            <CustomDropdown
                                label="Preferred District / Region"
                                value={formData.district}
                                options={districts}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                            <div className="hidden md:block text-sm text-slate-500 italic">
                                *Predictions are based on last year's trends.
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto btn-primary bg-[#1e3a8a] text-lg px-10 py-4 shadow-xl hover:shadow-2xl"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Analyzing Data...
                                    </>
                                ) : (
                                    <>
                                        Predict My Colleges
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PredictorForm;
