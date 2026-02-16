"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function OrganicCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation - critically damped to prevent oscillation
    const cursorX = useSpring(mouseX, { damping: 40, stiffness: 400 });
    const cursorY = useSpring(mouseY, { damping: 40, stiffness: 400 });

    useEffect(() => {
        setIsMounted(true);

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <>
            {/* Main cursor dot - smaller and more precise */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-sage rounded-full pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 99999,
                }}
            />
            {/* Trailing aura - smaller and cleaner */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 bg-sage/30 rounded-full pointer-events-none blur-md"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 99998,
                }}
            />
        </>
    );
}
