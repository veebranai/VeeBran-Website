'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export function StatsCounter() {
    const [stats, setStats] = useState({
        clients: 0,
        projects: 0,
        satisfaction: 0,
        support: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        const targetStats = {
            clients: 50,
            projects: 100,
            satisfaction: 100,
            support: 24
        };

        if (isInView && !hasAnimated) {
            setHasAnimated(true);

            // Increment animation (free, no external libraries)
            const duration = 2000; // 2 seconds
            const start = Date.now();

            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);

                setStats({
                    clients: Math.floor(targetStats.clients * progress),
                    projects: Math.floor(targetStats.projects * progress),
                    satisfaction: Math.floor(targetStats.satisfaction * progress),
                    support: Math.floor(targetStats.support * progress)
                });

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }
    }, [isInView, hasAnimated]);

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <StatItem
                number={`${stats.clients}+`}
                label="Projects Delivered"
                icon="🚀"
            />
            <StatItem
                number={`${stats.projects}+`}
                label="Clients Served"
                icon="👥"
            />
            <StatItem
                number={`${stats.satisfaction}%`}
                label="Client Satisfaction"
                icon="⭐"
            />
            <StatItem
                number={`${stats.support}/7`}
                label="Support Available"
                icon="🕒"
            />
        </div>
    );
}

function StatItem({ number, label, icon }: { number: string; label: string; icon: string }) {
    return (
        <div className="text-center p-6 bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-xl border border-brand-green/20">
            <div className="text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent mb-2">
                {number}
            </div>
            <div className="text-gray-400 font-medium">{label}</div>
            <div className="text-3xl mt-2">{icon}</div>
        </div>
    );
}
