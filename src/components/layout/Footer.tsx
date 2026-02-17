"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-vb-dark border-t border-white/5 py-12 md:py-20 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vb-green/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-vb-green/5 blur-[120px] rounded-full pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <Image src="/logo-light.png" alt="VeeBran Logo" width={120} height={32} className="h-8 w-auto" />
                        </Link>
                        <Typography variant="p" className="mb-6">
                            Beyond the Horizon. Next-generation business consulting powered by AI and nature-inspired innovation.
                        </Typography>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "https://twitter.com" },
                                { icon: Facebook, href: "https://facebook.com" },
                                { icon: Instagram, href: "https://instagram.com" },
                                { icon: Linkedin, href: "https://linkedin.com" }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-vb-green hover:text-white transition-all duration-300"
                                >
                                    <item.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <Typography variant="h4" className="mb-6">Company</Typography>
                        <ul className="space-y-4">
                            {[
                                { label: "About Us", href: "/about" },
                                { label: "Our Team", href: "/team" },
                                { label: "Careers", href: "/careers" },
                                { label: "News", href: "/news" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-vb-text/80 hover:text-vb-neon transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography variant="h4" className="mb-6">Services</Typography>
                        <ul className="space-y-4">
                            {[
                                { label: "Strategy", href: "/services?tab=strategy" },
                                { label: "AI Implementation", href: "/services?tab=ai" },
                                { label: "Digital Transformation", href: "/services?tab=digital" },
                                { label: "Analytics", href: "/services?tab=analytics" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="block text-vb-text/80 hover:text-vb-neon transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <Typography variant="h4" className="mb-6">Stay Ahead</Typography>
                        <Typography variant="small" className="mb-4">
                            Subscribe to our newsletter for the latest AI insights.
                        </Typography>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-vb-neon w-full"
                            />
                            <button className="bg-vb-green text-white px-4 rounded-lg hover:bg-green-600 transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <Typography variant="small">
                            © {currentYear} VeeBran Consulting. All rights reserved.
                        </Typography>
                        <span className="hidden md:inline text-white/20">|</span>
                        <Typography variant="small" className="text-vb-text/60">
                            Powered by <a href="https://hybridstudioz.framer.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-vb-neon transition-colors font-bold">Hybrid StudioZ</a> and <span className="text-vb-green font-bold">VeeBran AI</span>
                        </Typography>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-sm text-vb-text/60 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-vb-text/60 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
