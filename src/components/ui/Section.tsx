import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export function Section({
    className,
    children,
    fullWidth = false,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                "relative py-16 md:py-24 overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
