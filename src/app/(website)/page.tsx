'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ParticleBackground, ShapeIndicator } from "@/components/particles/VeeBranParticleSystem";
import { ServiceCard } from '@/components/sections/ServiceCard';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  // Services data (100% free - no CMS needed)
  const services = [
    {
      id: 'product-design',
      title: 'Product Design',
      description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
      services: [
        'User Research & Strategy',
        'UX Flows & Wireframes',
        'UI Systems & Prototypes',
        'Design Ops & Dev Handoff'
      ],
      tools: ['Figma', 'Adobe', 'Sketch', 'InVision']
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
      services: [
        'Frontend Platforms (React/Next)',
        'Backend APIs & Microservices (Node)',
        'Mobile & Cross-platform (Flutter)',
        'CI/CD & Cloud Ops (Docker)'
      ],
      tools: ['React', 'Node.js', 'Docker', 'Git']
    },
    {
      id: 'strategy',
      title: 'Strategic Consulting',
      description: 'Data-driven insights to navigate complex markets and unlock new growth horizons.',
      services: [
        'Market Analysis',
        'Digital Transformation',
        'AI Readiness Assessment',
        'Growth Hacking'
      ],
      tools: ['Python', 'Tableau', 'GPT-4', 'Excel']
    }
  ];

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <ShapeIndicator />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto z-10 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent mb-6"
          >
            Building Digital Solutions That Matter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl"
          >
            We empower organizations with AI that turns complex challenges into real-world outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a href="/contact" className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity text-center">
              Start Your Project
            </a>
            <a href="/work" className="bg-transparent border border-brand-green/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-green/10 transition-colors text-center">
              Explore Our Work
            </a>
          </motion.div>

          <StatsCounter />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 px-6 md:px-12 bg-black/20 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Case Studies
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Clinix AI', description: 'AI-powered clinical documentation and coding platform' },
              { title: 'Synergies4', description: 'AI-powered business intelligence platform' },
              { title: 'Curehire', description: 'Healthcare staffing platform' },
            ].map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-dark/40 p-8 rounded-2xl border border-brand-green/20 hover:border-brand-green/50 transition-colors"
              >
                <div className="h-48 bg-gradient-to-br from-brand-green/20 to-brand-blue/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-6xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                <p className="text-gray-400 mb-4">{caseStudy.description}</p>
                <div className="flex flex-wrap gap-2">
                  {['Web Design', 'App Design', 'AI Development', 'GTM'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-green/10 text-brand-green text-sm rounded-full border border-brand-green/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Trusted by Industry Leaders
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-12 items-center">
            {['Injazat', 'LOWE\'S', 'Cognizant', 'Trimple', 'e2open', 'Toyota'].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="h-16 w-40 bg-white/5 rounded-lg flex items-center justify-center text-xl font-bold text-brand-teal border border-white/10">
                  {client}
                </div>
              </motion.div>
            ))}
          </div>
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
            We turn bold ideas into powerful digital realities.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 mb-8"
          >
            Let&apos;s work together to create something that matters.
          </motion.p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-green to-brand-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity inline-block"
          >
            Let&apos;s Work Together
          </motion.a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
