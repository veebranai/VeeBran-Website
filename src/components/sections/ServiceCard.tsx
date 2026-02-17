'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export function ServiceCard({ service, index }: { service: any; index: number }) {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative bg-brand-dark/40 rounded-2xl overflow-hidden border border-brand-green/20 cursor-pointer group"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-blue/5" />

            {/* Content */}
            <div className="relative p-8 h-full">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <div className="text-brand-teal text-2xl">
                        <FaArrowUpRightFromSquare />
                    </div>
                </div>

                <p className="text-gray-400 mb-6">{service.description}</p>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm font-bold text-brand-teal mb-2">Services</h4>
                        <ul className="space-y-2">
                            {service.services.map((item: string, i: number) => (
                                <li key={i} className="flex items-start">
                                    <span className="mr-2 text-brand-teal">•</span>
                                    <span className="text-gray-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-brand-teal mb-2">Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            {service.tools.map((tool: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-brand-dark/50 text-gray-400 rounded-full text-sm">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-brand-green/10 backdrop-blur-sm"
            />

            {/* Click to expand */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-brand-dark/80 py-3 px-6 cursor-pointer"
                onClick={() => setIsExpanded(true)}
            >
                <div className="text-center text-brand-teal font-medium flex items-center justify-center">
                    <span>Learn More</span>
                    <span className="ml-2">→</span>
                </div>
            </div>

            {/* Expanded view */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/70"
                            onClick={() => setIsExpanded(false)}
                        />

                        <div className="relative bg-brand-dark/90 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-3xl font-bold">{service.title}</h3>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-gray-300 text-lg mb-8">{service.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold mb-4 text-brand-teal">Our Approach</h4>
                                        <p className="text-gray-400 mb-6">
                                            We take a holistic approach to {service.title.toLowerCase()}, starting with thorough research and ending with seamless implementation.
                                        </p>

                                        <h4 className="text-lg font-bold mb-3">Key Services</h4>
                                        <ul className="space-y-3">
                                            {service.services.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="mr-3 text-brand-teal mt-1">✓</span>
                                                    <span className="text-gray-400">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold mb-4 text-brand-teal">Tools & Technologies</h4>
                                        <p className="text-gray-400 mb-6">
                                            We use the best-in-class tools to deliver exceptional results for our clients.
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">
                                            {service.tools.map((tool: string, i: number) => (
                                                <div key={i} className="bg-brand-dark/50 p-4 rounded-lg text-center">
                                                    <div className="text-4xl mb-2">🛠️</div>
                                                    <div className="font-medium">{tool}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8">
                                            <h4 className="text-lg font-bold mb-3">Case Study</h4>
                                            <div className="bg-brand-dark/50 p-4 rounded-lg">
                                                <h5 className="font-bold mb-2">Clinix AI Platform</h5>
                                                <p className="text-gray-400 text-sm">
                                                    We helped a healthcare provider build an AI-powered clinical documentation platform that reduced documentation time by 40%.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <a href="/contact" className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity">
                                        Start Your Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
