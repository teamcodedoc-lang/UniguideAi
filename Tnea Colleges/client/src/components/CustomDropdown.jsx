import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ label, value, options, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        // Find if onChange expects an event or just value
        // Standardizing to mimic event.target.value for compatibility
        const fakeEvent = { target: { value: option } };
        onChange(fakeEvent);
        setIsOpen(false);
    };

    return (
        <div className="space-y-2" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border 
                               ${isOpen ? 'border-[#1e3a8a] ring-2 ring-[#1e3a8a] ring-opacity-20' : 'border-slate-300 dark:border-slate-700'} 
                               rounded-md flex items-center justify-between text-left transition-all duration-200 group hover:border-[#1e3a8a] dark:hover:border-blue-500`}
                >
                    <span className={`block truncate ${!value ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {value || placeholder}
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-[#1e3a8a]' : ''}`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar animate-in fade-in zoom-in-95 duration-100 origin-top">
                        <div className="p-1.5 space-y-0.5">
                            {options.map((option) => {
                                const isSelected = option === value;
                                return (
                                    <div
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`px-3 py-2.5 rounded-md text-sm cursor-pointer flex items-center justify-between transition-colors
                                            ${isSelected
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-[#1e3a8a] dark:text-blue-400 font-medium'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <span>{option}</span>
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomDropdown;
