"use client";

import { ServiceCard } from "@/components/sections/ServiceCard";

const SERVICES_DATA = [
    {
        id: 'strategy',
        title: 'Strategy & Consulting',
        description: "Reimagine your business model for the AI era. We identify high-impact opportunities where technology aligns with human ambition.",
        services: ["Business Model Innovation", "Digital Strategy Roadmap", "Market Disruption Analysis"],
        tools: ["SWOT Analysis", "Scenario Planning", "Value Chain Mapping", "Blue Ocean Strategy"]
    },
    {
        id: 'ai',
        title: 'AI Solutions',
        description: "Deploy custom AI solutions that solve real problems. From predictive modeling to generative AI agents, we build the intelligence you need.",
        services: ["LLM Integration & Fine-tuning", "Predictive Analytics Models", "Computer Vision Systems"],
        tools: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "Hugging Face"]
    },
    {
        id: 'digital',
        title: 'Digital Transformation',
        description: "Modernize your legacy systems into scalable, cloud-native architectures capable of supporting rapid innovation.",
        services: ["Cloud Migration Strategy", "Microservices Architecture", "API Ecosystem Design"],
        tools: ["AWS", "Kubernetes", "Docker", "Terraform", "React"]
    },
    {
        id: 'data',
        title: 'Data Analytics',
        description: "Turn raw data into kinetic energy. We build robust data pipelines and visualization engines that drive real-time action.",
        services: ["Data Warehouse Architecture", "Real-time Dashboards", "Data Governance & Compliance"],
        tools: ["Snowflake", "dbt", "Tableau", "PowerBI", "Apache Airflow"]
    },
];

export function ServiceSelector() {
    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {SERVICES_DATA.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

// Rewriting the whole file content plan.
