"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MotionLink = motion(Link as any);


interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "holographic" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
        const styleVariants: Record<NonNullable<ButtonProps['variant']>, string> = {
            primary: "bg-vb-green text-white hover:bg-green-700 shadow-lg hover:shadow-green-500/20",
            secondary: "bg-vb-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20",
            outline: "border border-vb-neon text-vb-neon hover:bg-vb-neon/10",
            holographic: "relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_15px_rgba(0,217,160,0.3)] hover:shadow-[0_0_25px_rgba(0,217,160,0.6)] hover:border-vb-neon/50 transition-all duration-300 group",
            ghost: "bg-transparent text-white hover:bg-white/10",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        const classes = cn(
            "rounded-full font-medium transition-colors flex items-center justify-center gap-2",
            styleVariants[variant],
            sizes[size],
            className
        );

        if (href) {
            return (
                <MotionLink
                    href={href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={classes}
                >
                    <span className="relative z-10">{children}</span>
                    {variant === "holographic" && (
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    )}
                </MotionLink>

            );
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={classes}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                {variant === "holographic" && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
