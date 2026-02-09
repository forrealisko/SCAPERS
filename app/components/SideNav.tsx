"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'gallery', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
];

export default function SideNav() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:block"
        >
            <div className="flex flex-col gap-6 items-end">
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative group/item flex items-center gap-4 py-2 cursor-pointer"
                            initial={false}
                        >
                            {/* Label - appears on hover of entire nav */}
                            <motion.span
                                animate={{
                                    opacity: isHovered || isActive ? 1 : 0,
                                    x: isHovered || isActive ? 0 : 10,
                                }}
                                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                                className={`text-[11px] font-bold uppercase tracking-[0.25em] whitespace-nowrap pointer-events-none select-none ${isActive
                                        ? 'text-forest'
                                        : 'text-stone-grey group-hover/item:text-forest'
                                    }`}
                            >
                                {item.label}
                            </motion.span>

                            {/* Dot indicator */}
                            <div className="relative flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1 : 0.7,
                                        backgroundColor: isActive ? '#1A4D2E' : '#9B9891',
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-2 h-2 rounded-full"
                                />

                                {/* Active ring */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute w-4 h-4 border border-forest/40 rounded-full"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30
                                        }}
                                    />
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </motion.nav>
    );
}
