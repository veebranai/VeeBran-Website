import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "small";
    component?: React.ElementType;
    children: React.ReactNode;
}

export function Typography({
    variant = "p",
    component,
    className,
    children,
    ...props
}: TypographyProps) {
    const Component: any = component || (variant === "p" || variant === "lead" || variant === "small" ? "p" : variant);

    const styles = {
        h1: "font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white",
        h2: "font-heading text-3xl md:text-5xl font-bold tracking-tight text-white/90",
        h3: "font-heading text-2xl md:text-3xl font-semibold text-white/90",
        h4: "font-heading text-xl md:text-2xl font-semibold text-white/80",
        p: "font-body text-base text-vb-text/80 leading-relaxed",
        lead: "font-body text-lg md:text-xl text-vb-text leading-relaxed font-medium",
        small: "font-body text-sm text-vb-text/60",
    };

    return (
        <Component className={cn(styles[variant], className)} {...props}>
            {children}
        </Component>
    );
}
