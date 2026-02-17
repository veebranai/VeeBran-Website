'use client';

import { motion } from 'framer-motion';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { VeeBranCardGrid } from '@/components/cards/VeeBranCard';

const SERVICES = [
    {
        title: 'Growth Strategy',
        description: 'Comprehensive business growth frameworks that combine market analysis, competitive intelligence, and strategic planning to accelerate your expansion.',
        type: 'growth' as const,
        services: [
            'Business Model Innovation',
            'Digital Transformation Strategy',
            'AI Readiness Assessment',
            'Market Analysis & Forecasting'
        ],
        tools: ['Tableau', 'Power BI', 'Python', 'SQL']
    },
    {
        title: 'Intelligent Connections',
        description: 'Seamless integration solutions that connect your data, systems, and teams to create unified intelligence and operational excellence.',
        type: 'connection' as const,
        services: [
            'Data Integration',
            'API Strategy',
            'Cloud Migration',
            'IoT Implementation'
        ],
        tools: ['AWS', 'Azure', 'Docker', 'MongoDB']
    },
    {
        title: 'Innovation Lab',
        description: 'Cutting-edge AI and machine learning solutions that transform how you operate, compete, and deliver value to your customers.',
        type: 'innovation' as const,
        services: [
            'AI Solution Design',
            'Machine Learning Pipelines',
            'Predictive Analytics',
            'Computer Vision Systems'
        ],
        tools: ['TensorFlow', 'Python', 'Google Cloud', 'PostgreSQL']
    },
    {
        title: 'Precision Engineering',
        description: 'Methodical development and implementation of robust systems that deliver reliability, scalability, and performance excellence.',
        type: 'precision' as const,
        services: [
            'Process Automation',
            'Quality Assurance',
            'Performance Optimization',
            'Security Implementation'
        ],
        tools: ['React', 'Node.js', 'Git', 'Docker']
    },
    {
        title: 'Energy Acceleration',
        description: 'Agile methodologies and DevOps practices that accelerate delivery, foster innovation, and drive continuous improvement across your organization.',
        type: 'energy' as const,
        services: [
            'Agile Development',
            'DevOps Integration',
            'Change Management',
            'Continuous Improvement'
        ],
        tools: ['Figma', 'Adobe', 'Sketch', 'InVision']
    }
];

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-neon/30">
            <ParticleBackground />
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
                        </p>
                    </motion.div>

                    <VeeBranCardGrid cards={SERVICES} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-blue/10 pointer-events-none" />
                <div className="max-w-3xl mx-auto text-center relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Ready to start your transformation?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-400 mb-8"
                    >
                        Let&apos;s build something extraordinary together.
                    </motion.p>

                    <motion.a
                        href="/contact"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity inline-block shadow-lg hover:shadow-brand-teal/20"
                    >
                        Get in Touch
                    </motion.a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
