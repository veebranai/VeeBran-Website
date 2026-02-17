"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { InteractiveParticles } from "./InteractiveParticles";
// import { Environment } from "@react-three/drei";

export function ParticleScene() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 2]} // Handle pixel ratio for sharp rendering on high-DPI screens
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <InteractiveParticles />
                    {/* <Environment preset="city" /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
