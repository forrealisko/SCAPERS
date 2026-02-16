"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, X, Phone } from "lucide-react";

export default function FloatingCTA({ onBookClick }: { onBookClick?: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsExpanded(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openRetellWidget = () => {
        setIsExpanded(false);
        if (window.RetellWidget) {
            window.RetellWidget.open();
        } else {
            // Fallback to the existing booking modal if Retell isn't loaded
            if (onBookClick) onBookClick();
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="mb-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-stone/20 overflow-hidden w-[280px] font-sans"
                            >
                                <div className="p-4 bg-sage/5 border-b border-stone/10">
                                    <h4 className="font-semibold text-forest flex items-center gap-2">
                                        <Sparkles size={16} className="text-sage" />
                                        Ready to transform?
                                    </h4>
                                </div>
                                <div className="p-2">
                                    {/* AI-powered booking via Retell */}
                                    <button
                                        onClick={openRetellWidget}
                                        className="w-full text-left flex items-center gap-3 p-3 hover:bg-sage/10 rounded-xl transition-colors text-sm font-medium mb-1 text-forest"
                                    >
                                        <Phone size={14} className="text-forest/60" />
                                        Talk to AI — Book Now
                                    </button>
                                    {/* Fallback: manual booking form */}
                                    <button
                                        onClick={() => {
                                            setIsExpanded(false);
                                            if (onBookClick) onBookClick();
                                        }}
                                        className="w-full text-left block p-3 hover:bg-stone/10 rounded-xl transition-colors text-sm font-medium mb-1 text-forest/70"
                                    >
                                        Fill out a form instead
                                    </button>
                                    <a
                                        href="#services"
                                        onClick={() => setIsExpanded(false)}
                                        className="block p-3 hover:bg-stone/10 rounded-xl transition-colors text-sm font-medium mb-1 text-forest/70"
                                    >
                                        View Pricing
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        layout
                        key="cta-button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 font-medium font-sans ${isExpanded ? "bg-stone text-white" : "bg-forest text-warm-white"
                            }`}
                    >
                        {isExpanded ? (
                            <X size={20} />
                        ) : (
                            <>
                                <Calendar size={18} />
                                <span>Book Now</span>
                            </>
                        )}
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
