'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    // Pricing
    {
        question: "How can AI help my small business without breaking the budget?",
        answer: "AI isn't just for tech giants. We implement scalable, low-cost AI tools that automate repetitive tasks (like scheduling and data entry) and provide customer insights. This 'pay-as-you-grow' model ensures you only invest in what delivers immediate ROI — most clients see breakeven within 60 days."
    },
    {
        question: "What does a typical consulting engagement cost?",
        answer: "Our engagements start at $5,000 for a focused strategy sprint and scale based on scope. We offer three models: Fixed Project Fee, Time & Materials, and Monthly Retainer. Every proposal includes a clear ROI projection so you know exactly what you're investing in."
    },
    // Process
    {
        question: "Do I need a full-time marketing team for digital transformation?",
        answer: "Not at all. Our philosophy is 'Strategic Efficiency'. We help you set up automated systems and high-impact strategies that a small team (or even a founder) can manage. We effectively act as your fractional CTO and CMO until you're ready to scale."
    },
    {
        question: "How long does it take to see results from AI implementation?",
        answer: "Most clients see measurable improvements within 30-60 days. Our 5-Phase Framework is designed for rapid prototyping — we deliver a working proof-of-concept in weeks, not months, so you can validate ROI before committing to full deployment."
    },
    // Technology
    {
        question: "Is my business too small for 'Big Tech' strategies?",
        answer: "The 'Big Tech' advantage is actually about data and agility. Small businesses are uniquely positioned to leverage these strategies faster than large corporations. We tailor enterprise-grade methodologies (like Agile and Lean) to fit your specific operational scale."
    },
    {
        question: "What AI technologies do you specialize in?",
        answer: "We work across the full AI stack: natural language processing (NLP) for chatbots and content, computer vision for quality inspection, predictive analytics for forecasting, and recommendation engines for personalization. We choose the right tool for each problem, not the trendiest one."
    },
    // Services
    {
        question: "How do I measure the success of digital consulting?",
        answer: "We move beyond vanity metrics. Success is measured in tangible outcomes: time saved through automation, customer acquisition cost (CAC) reduction, and direct revenue growth. We provide a transparent dashboard to track these KPIs in real time."
    },
    {
        question: "Can you work with our existing tech stack?",
        answer: "Absolutely. We're stack-agnostic by design. Whether you're running on AWS, Azure, GCP, or even on-premise servers, we integrate with your existing infrastructure. Our solutions are built on open standards to avoid vendor lock-in."
    },
    // About
    {
        question: "What makes VeeBran different from other consulting firms?",
        answer: "Three things: (1) We're practitioners, not just advisors — our team builds production AI systems. (2) We operate on a zero-lock-in model — you own everything we build. (3) We use our own proprietary frameworks that have been validated across 50+ client engagements."
    },
    {
        question: "Do you work with startups or only established businesses?",
        answer: "We work with both. For startups, we offer lean engagement models focused on building an AI-ready foundation. For established businesses, we focus on optimization and scaling existing operations with AI. The approach differs, but the commitment to measurable ROI is the same."
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Generate FAQPage JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 px-6 md:px-12 relative z-10">
            {/* FAQPage JSON-LD for AEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Common Questions
                    </h2>
                    <p className="text-gray-400">
                        Real answers to the questions business leaders ask most — from pricing to process.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-brand-dark/40 border border-brand-green/20 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                <span className="text-brand-green shrink-0">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-brand-green/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
