"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    pricing: string;
    details: string[];
}

export default function ServiceCard({ title, description, icon, pricing, details }: ServiceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    // 3D tilt on hover (only when flipped)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isFlipped || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ rotateX: -y * 6, rotateY: x * 6 });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
    };

    // Variants for icon animations
    const iconVariants = {
        idle: { rotate: 0, scale: 1, y: 0 },
        hover: (title: string) => {
            const t = title.toLowerCase();
            if (t.includes("scissors") || t.includes("palm")) {
                return {
                    rotate: [0, -15, 0, -15, 0, -15, 0, -15, 0],
                    transition: { duration: 0.6, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }
                };
            }
            if (t.includes("leaf") || t.includes("storm")) {
                return {
                    rotate: [0, 10, -10, 10, -10, 0],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as any }
                };
            }
            if (t.includes("flower") || t.includes("design")) {
                return {
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as any }
                };
            }
            if (t.includes("hammer") || t.includes("upgrades")) {
                return {
                    rotate: [0, -45, 0, -45, 0],
                    y: [0, -5, 0, -5, 0],
                    transition: { duration: 1, times: [0, 0.2, 0.5, 0.7, 1] }
                };
            }
            if (t.includes("sparkles") || t.includes("irrigation")) {
                return {
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.25, 1],
                    transition: { duration: 1.5, repeat: Infinity }
                };
            }
            return { scale: 1.1 };
        }
    };

    return (
        <div
            ref={cardRef}
            className="group h-[450px] w-full [perspective:1000px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                initial={false}
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                    rotateX: tilt.rotateX,
                    ...(isFlipped ? {} : { rotateY: 0 }),
                }}
                style={{
                    rotateX: isFlipped ? tilt.rotateX : 0,
                    rotateY: isFlipped ? 180 + tilt.rotateY : 0,
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-full h-full [transform-style:preserve-3d]"
            >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full bg-black p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center [backface-visibility:hidden] hover:border-white/20 transition-all duration-500">
                    <motion.div
                        className="w-16 h-16 text-sage mb-8"
                        variants={iconVariants}
                        animate="idle"
                        whileHover="hover"
                        custom={title}
                    >
                        {icon}
                    </motion.div>
                    <h3 className="text-2xl font-display font-medium text-warm-white mb-4">
                        {title}
                    </h3>
                    <div className="mt-8 px-6 py-2 rounded-full border border-white/20 text-warm-white/60 text-xs font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-forest transition-all duration-300">
                        Click to view details
                    </div>
                </div>

                {/* Back Side */}
                <div className="service-card-back-glow absolute inset-0 w-full h-full bg-forest p-8 rounded-2xl border border-white/20 flex flex-col text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h4 className="text-xl font-display font-medium text-sage mb-4">{title}</h4>
                    <p className="text-warm-white/80 text-sm leading-relaxed mb-6">
                        {description}
                    </p>

                    <div className="space-y-3 mb-8 flex-grow">
                        {details.map((detail, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                                className="flex items-center gap-3 text-sm text-warm-white/70"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                                {detail}
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-white/10 mt-auto flex justify-between items-center">
                        <span className="text-sage font-bold text-xl">{pricing}</span>
                        <div className="text-[10px] text-warm-white/40 uppercase tracking-tighter">Click to flip back</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
