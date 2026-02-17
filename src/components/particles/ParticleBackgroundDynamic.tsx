'use client';

import dynamic from 'next/dynamic';

const ParticleSystemComponent = dynamic(
    () => import('./ParticleSystem').then((mod) => mod.ParticleBackground),
    { ssr: false }
);

export function ParticleBackground() {
    return <ParticleSystemComponent />;
}
