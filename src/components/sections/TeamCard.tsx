'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface TeamMemberProps {
    member: {
        name: string;
        role: string;
        bio: string;
        skills: string[];
        color: string;
        image?: string;
    };
}

export function TeamCard({ member }: TeamMemberProps) {
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
                whileHover={{ y: -5 }}
                onClick={() => setIsExpanded(true)}
                className="bg-brand-dark/40 rounded-2xl p-8 cursor-pointer transition-all duration-300 relative overflow-hidden group border border-brand-green/20 hover:border-brand-green/50"
            >
                {/* Background Gradient */}
                <div
                    className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: member.color }}
                />

                <div className="flex items-start space-x-6 relative z-10">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-inner flex-shrink-0"
                        style={{
                            background: `linear-gradient(135deg, ${member.color}80, ${member.color}20)`,
                            border: `1px solid ${member.color}40`
                        }}
                    >
                        {member.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-2xl text-white mb-1 group-hover:text-brand-neon transition-colors">{member.name}</h3>
                        <p
                            className="font-medium mb-2 text-sm uppercase tracking-wide opacity-80"
                            style={{ color: member.color }}
                        >
                            {member.role}
                        </p>

                        <p className="text-gray-400 text-sm line-clamp-2">{member.bio}</p>

                        <div className="mt-4 flex items-center text-xs text-gray-500 group-hover:text-brand-teal transition-colors font-bold">
                            View Profile <span className="ml-1">→</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
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
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-brand-dark border border-brand-green/20 rounded-2xl max-w-2xl w-full p-8 md:p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white z-10 p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                                <div
                                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-6xl font-bold text-white shadow-lg flex-shrink-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${member.color}80, ${member.color}20)`,
                                        border: `1px solid ${member.color}40`
                                    }}
                                >
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{member.name}</h2>
                                    <p
                                        className="text-lg font-medium mb-4"
                                        style={{ color: member.color }}
                                    >
                                        {member.role}
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-brand-blue/20 transition-all">
                                            <FaLinkedin size={20} />
                                        </button>
                                        <button className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-brand-blue/20 transition-all">
                                            <FaTwitter size={20} />
                                        </button>
                                        <button className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-brand-blue/20 transition-all">
                                            <FaLink size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-brand-teal p-3 bg-brand-teal/10 rounded-lg inline-block text-sm font-bold uppercase tracking-wider mb-4">Biography</h4>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Areas of Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-white/5 border border-white/10 text-sm rounded-full text-gray-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
