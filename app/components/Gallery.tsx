"use client";

import { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
    {
        beforeImage: '/images/1before.jpg',
        afterImage: '/images/1after.jpg',
        beforeAlt: 'Wild backyard before landscaping',
        afterAlt: 'Architectural backyard paradise with perfect lighting',
        description: 'Luxury backyard transformation'
    },
    {
        beforeImage: '/images/2before.jpg',
        afterImage: '/images/2after.jpg',
        beforeAlt: 'Dry, barren garden space',
        afterAlt: 'Lush, vibrant garden with sculptural elements',
        description: 'Botanical garden redesign'
    },
    {
        beforeImage: '/images/3before.jpg',
        afterImage: '/images/3after.jpg',
        beforeAlt: 'Dated patio area',
        afterAlt: 'Minimalist luxury outdoor lounge',
        description: 'Premium hardscape construction'
    },
    {
        beforeImage: '/images/4before.jpg',
        afterImage: '/images/4after.jpg',
        beforeAlt: 'Unfinished yard space',
        afterAlt: 'Complete resort-style residential landscape',
        description: 'Master plan implementation'
    }
];

export default function Gallery() {
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setActiveImageIndex(index);
    const closeLightbox = () => setActiveImageIndex(null);
    const nextImage = () => setActiveImageIndex((prev) => (prev === null || prev === 4 ? 0 : prev + 1));
    const prevImage = () => setActiveImageIndex((prev) => (prev === null || prev === 0 ? 4 : prev - 1));

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Visual Projects */}
                {galleryImages.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone/10">
                            <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={item.beforeImage} alt={item.beforeAlt} />}
                                itemTwo={<ReactCompareSliderImage src={item.afterImage} alt={item.afterAlt} />}
                                className="w-full h-full"
                                handle={
                                    <div className="h-full w-[2px] bg-white/80 relative shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                                            <div className="w-1 h-4 bg-stone/20 rounded-full" />
                                        </div>
                                    </div>
                                }
                            />
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                Before / After
                            </div>
                        </div>
                        <p className="text-stone-grey font-medium text-sm uppercase tracking-widest pl-2">
                            {index === 0 ? "BACKYARD TRANSFORMATION" : "GARDEN RESTORATION"}
                        </p>
                    </div>
                ))}

                {/* Social Proof Section */}
                <div className="md:col-span-2 bg-white rounded-2xl p-8 md:p-12 border border-stone/20 shadow-sm flex flex-col items-center gap-12">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                        <div className="text-center md:text-left space-y-2">
                            <h3 className="text-4xl md:text-5xl font-display font-medium text-forest">100+</h3>
                            <p className="text-stone-grey font-medium uppercase tracking-widest text-sm">Happy Customers</p>
                        </div>

                        {/* Aesthetic Gallery of Thumbnails with Lightbox */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-0 md:-space-x-6 hover:space-x-2 transition-all duration-500 ease-signature group py-4">
                            {[1, 2, 3, 4, 5].map((num, idx) => (
                                <motion.div
                                    key={num}
                                    onClick={() => openLightbox(idx)}
                                    className="relative w-[72px] h-[72px] md:w-[108px] md:h-[108px] rounded-2xl overflow-hidden border-4 border-white shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                                    style={{ zIndex: 10 - num }}
                                >
                                    <Image
                                        src={`/images/ph${num}.jpg`}
                                        alt={`Customer project ${num}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 text-forest/80 items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                <span className="text-xs font-medium uppercase tracking-wider text-stone-grey">5-Star Rated</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                <span className="text-xs font-medium uppercase tracking-wider text-stone-grey">Insured</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                <span className="text-xs font-medium uppercase tracking-wider text-stone-grey">Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        <motion.button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
                            onClick={closeLightbox}
                        >
                            <X size={32} />
                        </motion.button>

                        <button
                            className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors p-2"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <motion.div
                            key={activeImageIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={`/images/ph${activeImageIndex + 1}.jpg`}
                                alt={`Project ${activeImageIndex + 1}`}
                                fill
                                className="object-cover"
                                quality={100}
                            />
                        </motion.div>

                        <button
                            className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors p-2"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImageIndex ? "bg-white w-6" : "bg-white/20"}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
