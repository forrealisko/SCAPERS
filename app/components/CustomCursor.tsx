"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Fast, snappy spring for a solid, responsive feel
    const cursorX = useSpring(mouseX, { damping: 50, stiffness: 600 });
    const cursorY = useSpring(mouseY, { damping: 50, stiffness: 600 });

    useEffect(() => {
        setIsMounted(true);

        // Hide default cursor across the body when mounted
        document.body.style.cursor = 'none';

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => document.body.style.cursor = 'none';
        const handleMouseLeave = () => document.body.style.cursor = 'auto';

        window.addEventListener("mousemove", updateMousePosition);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.body.style.cursor = 'auto';
        };
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-[14px] h-[14px] bg-gold rounded-full pointer-events-none mix-blend-difference z-[99999]"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    );
}
