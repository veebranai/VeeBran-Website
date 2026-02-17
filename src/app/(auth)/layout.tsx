
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Secure Access | VeeBran',
    description: 'Enterprise grade security login.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.05)_0%,rgba(0,0,0,0.8)_80%)]" />
                <div className="absolute w-[800px] h-[800px] -top-1/2 -left-1/2 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <main className="relative z-10 w-full max-w-md p-8">
                {children}
            </main>
        </div>
    );
}
