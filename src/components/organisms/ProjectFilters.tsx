"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/sections/ProjectCard';

const PROJECTS = [
    {
        id: 1,
        title: "EcoStream Supply Chain",
        category: "AI",
        description: "Reduced logistics carbon footprint by 40% using predictive routing algorithms.",
        bgGradient: "bg-gradient-to-br from-[#008F5D] to-[#004E8F]",
        challenge: "EcoStream faced rising fuel costs and inefficient delivery routes that increased their carbon footprint.",
        solution: "We deployed a custom machine learning model that analyzes traffic patterns, weather conditions, and vehicle load to optimize routes in real-time.",
        results: ["40% Reduction in Carbon Emissions", "25% Decrease in Fuel Costs", "On-time Delivery increased to 98%"],
        technologies: ["Python", "TensorFlow", "Google Maps API", "AWS"]
    },
    {
        id: 2,
        title: "FinTech Risk Sentinel",
        category: "Data",
        description: "Real-time fraud detection processing 50,000 transactions per second with 99.9% accuracy.",
        bgGradient: "bg-gradient-to-br from-[#004E8F] to-[#00D9A0]",
        challenge: "Legacy rule-based systems were failing to detect sophisticated fraud patterns, leading to significant financial losses.",
        solution: "We built a streaming data architecture using Apache Kafka and Flink to process transactions in real-time, feeding a deep learning anomaly detection model.",
        results: ["99.9% Fraud Detection Accuracy", "$50M Potential Fraud Prevented", "<10ms Latency"],
        technologies: ["Apache Kafka", "Flink", "PyTorch", "Kubernetes"]
    },
    {
        id: 3,
        title: "Retail Vision OS",
        category: "AI",
        description: "Computer vision system for automated inventory management and customer behavior analysis.",
        bgGradient: "bg-gradient-to-br from-[#FFC700] to-[#008F5D]",
        challenge: "Inaccurate inventory counts and lack of customer insight in physical stores were hurting profitability.",
        solution: "We installed edge-computing cameras running lightweight object detection models to track stock levels and heatmaps of customer movement.",
        results: ["95% Inventory Accuracy", "15% Sales Uplift from Optimization", "Automated Restocking Alerts"],
        technologies: ["OpenCV", "YOLOv8", "Edge AI", "Azure IoT"]
    },
    {
        id: 4,
        title: "Global Health Connect",
        category: "Digital",
        description: "Secure, interoperable telemedicine platform connecting localized clinics with global specialists.",
        bgGradient: "bg-gradient-to-br from-[#00D9A0] to-[#004E8F]",
        challenge: "Fragmented healthcare systems prevented patients in remote areas from accessing specialist care.",
        solution: "We developed a HIPAA-compliant telemedicine platform with WebRTC video streaming and secure EMR integration.",
        results: ["1M+ Consultations Conducted", "Access Expanded to 50+ Countries", " Patient Satisfaction 4.9/5"],
        technologies: ["WebRTC", "Next.js", "Node.js", "PostgreSQL"]
    },
    {
        id: 5,
        title: "SmartGrid Energy",
        category: "Strategy",
        description: "Digital transformation strategy for a major utility provider shifting to renewable sources.",
        bgGradient: "bg-gradient-to-br from-[#004E8F] to-[#FFC700]",
        challenge: "A traditional utility grid was struggling to integrate variable renewable energy sources like solar and wind.",
        solution: "We designed a digital twin of the grid and a strategic roadmap for deploying smart meters and distributed energy resource management systems (DERMS).",
        results: ["30% Increase in Renewable Integration", "Grid Stability Improved", "Strategic Roadmap Apporved by Board"],
        technologies: ["Digital Twin", "IoT Strategy", "Big Data", "Cloud"]
    },
    {
        id: 6,
        title: "Autonomous Fleet",
        category: "AI",
        description: "Deployment framework for L4 autonomous delivery vehicles in urban environments.",
        bgGradient: "bg-gradient-to-br from-[#008F5D] to-[#00D9A0]",
        challenge: "Safety and regulatory compliance were major barriers to deploying autonomous delivery bots.",
        solution: "We built a simulation environment to test edge cases and a safety verification framework that satisfied regulatory bodies.",
        results: ["Regulatory Approval Granted", "Zero Safety Incidents in Pilot", "10k+ Autonomous Deliveries"],
        technologies: ["ROS", "Gazebo Simulator", "C++", "Lidar Processing"]
    },
];

const CATEGORIES = ['All', 'AI', 'Data', 'Strategy', 'Digital'];

export function ProjectFilters() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    return (
        <div className="w-full">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 mb-16 justify-center">
                {CATEGORIES.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "px-6 py-2 rounded-full font-bold transition-all border",
                            activeCategory === category
                                ? "bg-vb-neon text-vb-dark border-vb-neon shadow-[0_0_15px_rgba(0,217,160,0.4)]"
                                : "bg-white/5 border-white/10 text-vb-text/60 hover:text-white hover:border-white/30"
                        )}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>

            {/* Project Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
