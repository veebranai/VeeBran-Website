'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

// ===== VEEBRAN BRAND COLORS =====
const BRAND_COLORS = {
    green: '#2E7D32',
    blue: '#1565C0',
    teal: '#00D9A0',
    yellow: '#FFD54F',
    dark: '#0A0F0D',
};

type CardType = 'growth' | 'connection' | 'innovation' | 'precision' | 'energy';

interface VeeBranCardProps {
    title: string;
    description: string;
    type: CardType;
    services: string[];
    tools: string[];
    index: number;
    expanded?: boolean;
    onExpand?: (expanded: boolean) => void;
}

// ===== CARD TYPE CONFIGURATIONS =====
const CARD_CONFIGS = {
    growth: {
        color: BRAND_COLORS.green,
        gradient: 'from-brand-green/20 to-brand-teal/10',
        border: 'border-brand-green/30',
        icon: '🌱',
        animation: {
            scale: 1.05,
            rotate: 2,
            duration: 0.6,
        },
        description: "Nurturing your business potential through strategic growth",
    },
    connection: {
        color: BRAND_COLORS.blue,
        gradient: 'from-brand-blue/20 to-brand-teal/10',
        border: 'border-brand-blue/30',
        icon: '🕸️',
        animation: {
            scale: 1.03,
            rotate: 0,
            duration: 0.5,
        },
        description: "Building intelligent networks that connect data to insights",
    },
    innovation: {
        color: BRAND_COLORS.teal,
        gradient: 'from-brand-teal/20 to-brand-green/10',
        border: 'border-brand-teal/30',
        icon: '🌳',
        animation: {
            scale: 1.04,
            rotate: -2,
            duration: 0.7,
        },
        description: "Unlocking branching possibilities through innovative solutions",
    },
    precision: {
        color: BRAND_COLORS.yellow,
        gradient: 'from-brand-yellow/20 to-brand-teal/10',
        border: 'border-brand-yellow/30',
        icon: '⚡',
        animation: {
            scale: 1.02,
            rotate: 0,
            duration: 0.4,
        },
        description: "Delivering structured excellence with methodical precision",
    },
    energy: {
        color: BRAND_COLORS.teal,
        gradient: 'from-brand-teal/20 to-brand-yellow/10',
        border: 'border-brand-teal/30',
        icon: '💫',
        animation: {
            scale: 1.06,
            rotate: 3,
            duration: 0.8,
        },
        description: "Fueling transformative momentum with dynamic energy",
    },
};

export function VeeBranCard({
    title,
    description,
    type,
    services,
    tools,
    index,
    expanded = false,
    onExpand,
}: VeeBranCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(expanded);
    const [contentHeight, setContentHeight] = useState(0);
    const [randomPos, setRandomPos] = useState({ x: 50, y: 50 });
    const contentRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isInView = useInView(contentRef, { once: true, margin: '-100px' });

    const config = CARD_CONFIGS[type];

    // Handle content height for smooth expansion
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isExpanded]);

    // Handle expand/collapse
    useEffect(() => {
        setIsExpanded(expanded);
    }, [expanded]);

    // Handle hover animations
    useEffect(() => {
        if (isHovered) {
            controls.start({
                scale: config.animation.scale,
                rotate: config.animation.rotate,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: config.animation.duration
                }
            });
        } else {
            controls.start({
                scale: 1,
                rotate: 0,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: config.animation.duration
                }
            });
        }
    }, [isHovered, controls, config]);

    // Initial random position for hover effect (stabilized after hydration)
    useEffect(() => {
        setRandomPos({
            x: Math.random() * 100,
            y: Math.random() * 100
        });
    }, []);

    // Handle expand state change
    const toggleExpand = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onExpand?.(newExpanded);

        // Lock body scroll when expanded
        if (newExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30
            }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
            }}
            className="relative"
        >
            {/* ===== CARD CONTAINER ===== */}
            <motion.div
                ref={contentRef}
                animate={controls}
                className={`
          relative bg-brand-dark/40 rounded-2xl overflow-hidden border 
          ${config.border}
          cursor-pointer group
          transition-all duration-500
          hover:shadow-2xl hover:shadow-${type}-500/20
        `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={toggleExpand}
            >
                {/* ===== ORGANIC BACKGROUND PATTERN ===== */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30`}
                    style={{
                        backgroundImage:
                            type === 'growth' ? 'radial-gradient(circle at 20% 30%, rgba(46, 125, 50, 0.1) 0%, transparent 40%)' :
                                type === 'connection' ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(21, 101, 192, 0.05) 10px, rgba(21, 101, 192, 0.05) 20px)' :
                                    type === 'innovation' ? 'radial-gradient(circle at 30% 70%, rgba(0, 217, 160, 0.1) 0%, transparent 30%)' :
                                        type === 'precision' ? 'linear-gradient(45deg, rgba(255, 213, 79, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 213, 79, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 213, 79, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 213, 79, 0.05) 75%)' :
                                            'radial-gradient(circle at 70% 20%, rgba(0, 217, 160, 0.15) 0%, transparent 40%)',
                        backgroundSize:
                            type === 'precision' ? '20px 20px' : 'cover',
                    }}
                />

                {/* ===== CONTENT LAYERS ===== */}
                <div className="relative z-10 p-8">
                    {/* ===== CARD HEADER ===== */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.2 : 1,
                                    rotate: isHovered ? 10 : 0
                                }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="text-3xl"
                            >
                                {config.icon}
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-bold" style={{ color: config.color }}>
                                    {title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">{config.description}</p>
                            </div>
                        </div>

                        {/* ===== EXPAND INDICATOR ===== */}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-gray-400 group-hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </motion.div>
                    </div>

                    {/* ===== CARD BODY ===== */}
                    <AnimatePresence initial={false} mode="wait">
                        {!isExpanded ? (
                            // ===== COLLAPSED STATE =====
                            <motion.div
                                key="collapsed"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    height: 'auto'
                                }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-gray-300 mb-6 line-clamp-3">
                                    {description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold mb-3" style={{ color: config.color }}>
                                            What We Offer
                                        </h4>
                                        <ul className="space-y-2 text-gray-400">
                                            {services.slice(0, 3).map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + i * 0.05 }}
                                                    className="flex items-start"
                                                >
                                                    <span className="mr-2" style={{ color: config.color }}>•</span>
                                                    {item}
                                                </motion.li>
                                            ))}
                                            {services.length > 3 && (
                                                <li className="text-xs text-gray-500 mt-1">
                                                    +{services.length - 3} more services
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-3" style={{ color: config.color }}>
                                            Tools & Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tools.slice(0, 4).map((tool, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 + i * 0.05 }}
                                                    className="px-3 py-1 bg-brand-dark/50 rounded-full text-sm"
                                                    style={{ borderColor: config.color, borderWidth: '1px' }}
                                                >
                                                    {tool}
                                                </motion.span>
                                            ))}
                                            {tools.length > 4 && (
                                                <span className="px-3 py-1 bg-brand-dark/50 rounded-full text-sm text-gray-500">
                                                    +{tools.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ===== LEARN MORE BUTTON ===== */}
                                <div className="mt-8 pt-6 border-t border-brand-green/20">
                                    <div className="flex items-center justify-center text-sm font-medium" style={{ color: config.color }}>
                                        <span>Learn More About {title}</span>
                                        <motion.span
                                            animate={{ x: isHovered ? 5 : 0 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className="ml-2"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // ===== EXPANDED STATE =====
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-8"
                            >
                                <p className="text-gray-300 text-lg">
                                    {description}
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* ===== DETAILED SERVICES ===== */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                                                Our Approach
                                            </h4>
                                            <p className="text-gray-400">
                                                We take a holistic approach to {title.toLowerCase()}, combining deep industry expertise with cutting-edge technology to deliver measurable results.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-bold mb-3" style={{ color: config.color }}>
                                                Key Services
                                            </h4>
                                            <ul className="space-y-4">
                                                {services.map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 + i * 0.1 }}
                                                        className="flex items-start group"
                                                    >
                                                        <div
                                                            className="mr-3 mt-1 p-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                                                            style={{
                                                                backgroundColor: config.color,
                                                                transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-3 w-3 text-white"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={3}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-200">{item}</div>
                                                            <div className="text-sm text-gray-500 mt-1">
                                                                {getDetailedDescription(item, type)}
                                                            </div>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* ===== TOOLS & CASE STUDY ===== */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                                                Tools & Technologies
                                            </h4>
                                            <p className="text-gray-400 mb-6">
                                                We leverage the most advanced tools and technologies to deliver exceptional results for our clients.
                                            </p>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {tools.map((tool, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.4 + i * 0.08 }}
                                                        className="bg-brand-dark/50 p-4 rounded-xl text-center border border-brand-green/10 hover:border-brand-green/30 transition-all"
                                                    >
                                                        <div className="text-3xl mb-2">
                                                            {getToolIcon(tool)}
                                                        </div>
                                                        <div className="font-medium text-sm">{tool}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-brand-dark/50 to-brand-dark/80 rounded-xl p-6 border border-brand-green/20">
                                            <h4 className="text-lg font-bold mb-3" style={{ color: config.color }}>
                                                Real Impact
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center">
                                                    <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                    <div className="text-gray-300">
                                                        <span className="font-bold">40%</span> average efficiency gain
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                    <div className="text-gray-300">
                                                        <span className="font-bold">2.5x</span> faster time-to-market
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                    <div className="text-gray-300">
                                                        <span className="font-bold">95%</span> client retention rate
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-brand-dark/50 rounded-lg p-4 border-l-4" style={{ borderColor: config.color }}>
                                            <h5 className="font-bold mb-2">Client Success Story</h5>
                                            <p className="text-gray-400 text-sm">
                                                &quot;VeeBran&apos;s {title.toLowerCase()} transformed our operations, delivering measurable results within 90 days of implementation.&quot;
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">— Healthcare Industry Leader</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== CTA SECTION ===== */}
                                <div className="pt-8 border-t border-brand-green/20">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h4 className="text-xl font-bold" style={{ color: config.color }}>
                                                Ready to Transform Your Business?
                                            </h4>
                                            <p className="text-gray-400 mt-2">
                                                Let&apos;s discuss how our {title.toLowerCase()} can drive measurable results for your organization.
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle CTA click
                                            }}
                                        >
                                            Schedule a Consultation
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ===== HOVER EFFECT LAYER ===== */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-brand-dark/20 to-transparent pointer-events-none"
                    style={{
                        background:
                            type === 'growth' ? `radial-gradient(circle at ${randomPos.x}% ${randomPos.y}%, ${BRAND_COLORS.green}20 0%, transparent 70%)` :
                                type === 'connection' ? `radial-gradient(circle at ${randomPos.x}% ${randomPos.y}%, ${BRAND_COLORS.blue}20 0%, transparent 70%)` :
                                    type === 'innovation' ? `radial-gradient(circle at ${randomPos.x}% ${randomPos.y}%, ${BRAND_COLORS.teal}20 0%, transparent 70%)` :
                                        type === 'precision' ? `radial-gradient(circle at ${randomPos.x}% ${randomPos.y}%, ${BRAND_COLORS.yellow}20 0%, transparent 70%)` :
                                            `radial-gradient(circle at ${randomPos.x}% ${randomPos.y}%, ${BRAND_COLORS.teal}20 0%, transparent 70%)`
                    }}
                />
            </motion.div>

            {/* ===== EXPANDED OVERLAY ===== */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={toggleExpand}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative bg-brand-dark/95 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-brand-green/30 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={toggleExpand}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Card content - same as expanded state above */}
                            <div className="p-10">
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="text-5xl">{config.icon}</div>
                                    <div>
                                        <h2 className="text-4xl font-bold mb-3" style={{ color: config.color }}>
                                            {title}
                                        </h2>
                                        <p className="text-xl text-gray-300">{config.description}</p>
                                    </div>
                                </div>

                                {/* Reuse the expanded content from above */}
                                <div className="space-y-8">
                                    <p className="text-gray-300 text-lg">
                                        {description}
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                                                    Our Approach
                                                </h4>
                                                <p className="text-gray-400">
                                                    We take a holistic approach to {title.toLowerCase()}, combining deep industry expertise with cutting-edge technology to deliver measurable results.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-bold mb-3" style={{ color: config.color }}>
                                                    Key Services
                                                </h4>
                                                <ul className="space-y-4">
                                                    {services.map((item, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <div className="mr-3 mt-1 p-1.5 rounded-full" style={{ backgroundColor: config.color }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-200">{item}</div>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    {getDetailedDescription(item, type)}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-xl font-bold mb-4" style={{ color: config.color }}>
                                                    Tools & Technologies
                                                </h4>
                                                <p className="text-gray-400 mb-6">
                                                    We leverage the most advanced tools and technologies to deliver exceptional results for our clients.
                                                </p>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                    {tools.map((tool, i) => (
                                                        <div key={i} className="bg-brand-dark/50 p-4 rounded-xl text-center border border-brand-green/10">
                                                            <div className="text-3xl mb-2">{getToolIcon(tool)}</div>
                                                            <div className="font-medium text-sm">{tool}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-br from-brand-dark/50 to-brand-dark/80 rounded-xl p-6 border border-brand-green/20">
                                                <h4 className="text-lg font-bold mb-3" style={{ color: config.color }}>
                                                    Real Impact
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center">
                                                        <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                        <div className="text-gray-300"><span className="font-bold">40%</span> average efficiency gain</div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                        <div className="text-gray-300"><span className="font-bold">2.5x</span> faster time-to-market</div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="text-3xl mr-3" style={{ color: config.color }}>✓</div>
                                                        <div className="text-gray-300"><span className="font-bold">95%</span> client retention rate</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-brand-green/20">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <h4 className="text-xl font-bold" style={{ color: config.color }}>
                                                    Ready to Transform Your Business?
                                                </h4>
                                                <p className="text-gray-400 mt-2">
                                                    Let&apos;s discuss how our {title.toLowerCase()} can drive measurable results for your organization.
                                                </p>
                                            </div>
                                            <button
                                                className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                                            >
                                                Schedule a Consultation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Helper functions
function getDetailedDescription(service: string, type: CardType): string {
    const descriptions: Record<string, Record<string, string>> = {
        growth: {
            'Business Model Innovation': 'Redesigning core business models for sustainable growth in digital economy',
            'Digital Transformation Strategy': 'Comprehensive roadmap for technology-driven business evolution',
            'AI Readiness Assessment': 'Evaluating organizational preparedness for AI implementation',
            'Market Analysis & Forecasting': 'Data-driven insights into market trends and opportunities'
        },
        connection: {
            'Data Integration': 'Seamless connection of disparate data sources for unified insights',
            'API Strategy': 'Building robust API ecosystems for system interoperability',
            'Cloud Migration': 'Strategic transition to cloud infrastructure with minimal disruption',
            'IoT Implementation': 'Connecting physical assets to digital intelligence'
        },
        innovation: {
            'AI Solution Design': 'Creating custom AI architectures tailored to business needs',
            'Machine Learning Pipelines': 'End-to-end ML workflows from data to deployment',
            'Predictive Analytics': 'Advanced forecasting models for proactive decision-making',
            'Computer Vision Systems': 'Visual intelligence solutions for automation and insight'
        },
        precision: {
            'Process Automation': 'Eliminating manual work through intelligent automation',
            'Quality Assurance': 'Rigorous testing frameworks for reliable systems',
            'Performance Optimization': 'Maximizing system efficiency and scalability',
            'Security Implementation': 'Enterprise-grade security protocols and practices'
        },
        energy: {
            'Agile Development': 'Rapid iteration cycles for faster value delivery',
            'DevOps Integration': 'Seamless development and operations collaboration',
            'Change Management': 'Guiding organizational transformation with minimal friction',
            'Continuous Improvement': 'Ongoing optimization of systems and processes'
        }
    };

    return descriptions[type as keyof typeof descriptions][service] || 'Delivering exceptional results through our expertise';
}

function getToolIcon(tool: string): string {
    const icons: Record<string, string> = {
        'Figma': '🎨',
        'Adobe': '🖌️',
        'Sketch': '✏️',
        'InVision': '✨',
        'React': '⚛️',
        'Node.js': '🟢',
        'Docker': '🐳',
        'Git': '🌱',
        'Python': '🐍',
        'TensorFlow': '🧠',
        'AWS': '☁️',
        'Azure': '🔵',
        'Google Cloud': '🔴',
        'Tableau': '📊',
        'Power BI': '📈',
        'SQL': '🗄️',
        'MongoDB': '🍃',
        'PostgreSQL': '🐘'
    };

    return icons[tool] || '🛠️';
}

// ===== CARD GRID SYSTEM =====
export function VeeBranCardGrid({ cards }: {
    cards: Array<{
        title: string;
        description: string;
        type: CardType;
        services: string[];
        tools: string[];
    }>
}) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <VeeBranCard
                        key={index}
                        {...card}
                        index={index}
                        expanded={expandedIndex === index}
                        onExpand={(expanded) => {
                            if (expanded) {
                                setExpandedIndex(index);
                            } else {
                                setExpandedIndex(null);
                            }
                        }}
                    />
                ))}
            </div>

            {/* ===== GRID DECORATION ===== */}
            <div className="relative mt-16">
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-teal/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
