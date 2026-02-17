"use client";

import { TeamCard } from '@/components/sections/TeamCard';

const TEAM_MEMBERS = [
    {
        name: "Vishva Ambasana",
        role: "Founder & CEO",
        bio: "Visionary leader with 15+ years in AI strategy and business transformation. Previously led digital innovation at Fortune 500 tech firms. Passionate about ethical AI and sustainable tech.",
        skills: ["Strategic Vision", "AI Leadership", "Business Architecture"],
        color: "#008F5D" // vb-green
    },
    {
        name: "Sarah J.",
        role: "Chief Technology Officer",
        bio: "Architect of the VeeBran Enterprise AI Platform. Expert in Large Language Models and scalable cloud infrastructure. Former Google Cloud architect with a focus on machine learning ops.",
        skills: ["Machine Learning", "Cloud Architecture", "System Design"],
        color: "#004E8F" // vb-blue
    },
    {
        name: "Marcus T.",
        role: "Head of Design",
        bio: "Award-winning designer focused on human-centric AI interfaces. Believes technology should feel as natural as breathing. Leads our design system and UX research initiatives.",
        skills: ["UI/UX", "Design Systems", "Interaction Design"],
        color: "#00D9A0" // vb-neon
    },
    {
        name: "Elena R.",
        role: "Lead Data Scientist",
        bio: "Ph.D. in Computational Statistics. Specializes in turning complex data sets into actionable business intelligence. Published researcher in predictive analytics and data visualization.",
        skills: ["Predictive Analytics", "Data Mining", "Statistical Modeling"],
        color: "#FFC700" // vb-yellow
    }
];

export function TeamProfiles() {
    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {TEAM_MEMBERS.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
}
