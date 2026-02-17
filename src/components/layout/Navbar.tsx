"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Company", href: "/company" },
    { name: "Verdant AI", href: "/ai" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled ? "py-4 glass border-b border-white/5" : "py-6 bg-transparent"
                )}
            >
                <Container>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="relative z-50 flex items-center gap-2 group">
                            <Image src="/logo-light.png" alt="VeeBran Logo" width={150} height={40} className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300" />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative text-sm font-medium transition-colors hover:text-vb-neon",
                                        pathname === link.href ? "text-vb-neon" : "text-vb-text/80"
                                    )}
                                >
                                    {link.name}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vb-neon"
                                        />
                                    )}
                                </Link>
                            ))}
                            <Button variant="holographic" size="sm" href="/contact">
                                Get Started
                            </Button>
                        </nav>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden relative z-50 text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </Container>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-vb-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-vb-neon transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button variant="holographic" size="lg" href="/contact" onClick={() => setMobileMenuOpen(false)}>
                            Get Started
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
