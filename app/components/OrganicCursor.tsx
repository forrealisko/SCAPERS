"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function OrganicCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const cursorX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const cursorY = useSpring(mouseY, { damping: 30, stiffness: 200 });

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
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-sage rounded-full pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 99999,
                }}
            />
            {/* Trailing aura */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 bg-sage/40 rounded-full pointer-events-none blur-lg"
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
