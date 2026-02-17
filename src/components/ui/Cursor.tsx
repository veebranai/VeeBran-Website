"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export function Cursor() {
    const [hovered, setHovered] = useState(false);
    const mousePosition = useMousePosition();

    // Use springs for smooth following
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        cursorX.set(mousePosition.x - 16);
        cursorY.set(mousePosition.y - 16);
    }, [mousePosition, cursorX, cursorY]);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button" || target.closest("a") || target.closest("button")) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <motion.div
                className="w-full h-full bg-vb-neon rounded-full"
                animate={{
                    scale: hovered ? 2.5 : 1,
                    opacity: hovered ? 0.8 : 0.5,
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
}
