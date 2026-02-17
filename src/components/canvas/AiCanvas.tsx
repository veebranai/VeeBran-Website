"use client";

import { Canvas } from "@react-three/fiber";
import { AiParticles } from '@/components/canvas/AiParticles';
import { Suspense } from "react";

type AiCanvasProps = {
    state: 'idle' | 'processing' | 'complete';
};

import { WebGLErrorBoundary } from "@/components/common/WebGLErrorBoundary";

export default function AiCanvas({ state }: AiCanvasProps) {
    return (
        <WebGLErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-br from-black to-vb-dark" />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* @ts-ignore: R3F types not yet updated for React 19 */}
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <AiParticles state={state} />
                </Suspense>
            </Canvas>
        </WebGLErrorBoundary>
    );
}
