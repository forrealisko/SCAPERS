"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let mouseX = -1000;
        let mouseY = -1000;
        let animFrame: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const GRID_SIZE = 40;
        const DOT_RADIUS = 0.8;
        const LINE_ALPHA = 0.04;
        const DOT_BASE_ALPHA = 0.08;
        const SPOTLIGHT_RADIUS = 280;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            ctx.strokeStyle = `rgba(155, 152, 145, ${LINE_ALPHA})`;
            ctx.lineWidth = 0.5;

            // Vertical lines
            for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw dots at intersections with spotlight effect
            for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
                for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Spotlight proximity boost
                    const proximity = Math.max(0, 1 - dist / SPOTLIGHT_RADIUS);
                    const alpha = DOT_BASE_ALPHA + proximity * 0.35;
                    const radius = DOT_RADIUS + proximity * 2.2;

                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(40, 54, 24, ${alpha})`;
                    ctx.fill();

                    // Spotlight glow ring on close dots
                    if (proximity > 0.4) {
                        ctx.beginPath();
                        ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(205, 213, 174, ${proximity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Soft radial glow at mouse position
            if (mouseX > 0 && mouseY > 0) {
                const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, SPOTLIGHT_RADIUS);
                gradient.addColorStop(0, "rgba(205, 213, 174, 0.04)");
                gradient.addColorStop(0.5, "rgba(205, 213, 174, 0.015)");
                gradient.addColorStop(1, "rgba(205, 213, 174, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(mouseX - SPOTLIGHT_RADIUS, mouseY - SPOTLIGHT_RADIUS, SPOTLIGHT_RADIUS * 2, SPOTLIGHT_RADIUS * 2);
            }

            animFrame = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        resize();
        draw();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
            }}
        />
    );
}
