'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProjectProps {
    project: {
        id: number | string;
        title: string;
        category: string;
        description: string;
        bgGradient?: string;
        image?: string;
        challenge?: string;
        solution?: string;
        results?: string[];
        technologies?: string[];
    };
    index: number;
}

export function ProjectCard({ project, index }: ProjectProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isExpanded]);

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                onClick={() => setIsExpanded(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-brand-dark/40 rounded-2xl overflow-hidden border border-brand-green/20 group cursor-pointer relative h-full flex flex-col"
            >
                {/* Card Header / Image Area */}
                <div className={cn("aspect-video w-full relative overflow-hidden", project.bgGradient || "bg-brand-dark")}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                        <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <FaArrowUpRightFromSquare />
                        </span>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-brand-neon text-xs font-bold uppercase tracking-widest border border-brand-neon/30 px-3 py-1 rounded-full">{project.category}</span>
                    </div>
                    <h3 className="font-bold text-2xl text-white mb-3 font-heading group-hover:text-brand-neon transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                    <div className="text-brand-teal text-sm font-bold flex items-center">
                        View Case Study <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </motion.div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-brand-dark border border-brand-green/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl scrollbar-thin scrollbar-thumb-brand-green scrollbar-track-brand-dark/50"
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white z-10 bg-black/50 rounded-full p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className={cn("h-64 w-full relative", project.bgGradient || "bg-brand-teal/20")}>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="text-brand-neon text-sm font-bold uppercase tracking-widest border border-brand-neon/30 px-3 py-1 rounded-full mb-4 inline-block">{project.category}</span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    <div className="md:col-span-2 space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-teal mb-4">The Challenge</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {project.challenge || "Navigating complex market dynamics while ensuring scalability and user retention was the primary hurdle. We needed a solution that would not only address current bottlenecks but pave the way for future growth."}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-teal mb-4">The Solution</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {project.solution || "We implemented a bespoke AI-driven architecture, leveraging real-time data processing and a modular frontend system. This approach ensured high performance, security, and a seamless user experience."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {(project.technologies || ['Next.js', 'React', 'Node.js', 'AI']).map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-teal">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4">Key Results</h3>
                                            <ul className="space-y-3">
                                                {(project.results || ['40% Efficiency Increase', '2x User Growth', '99.9% Uptime']).map((result, i) => (
                                                    <li key={i} className="flex items-start text-sm text-gray-400">
                                                        <span className="text-brand-green mr-2">✓</span>
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                                    <div className="text-gray-500 text-sm">Case Study ID: #{project.id}</div>
                                    <a href="/contact" className="bg-brand-green hover:bg-brand-teal text-white px-6 py-3 rounded-full font-bold transition-colors">
                                        Start Similar Project
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
