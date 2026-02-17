'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// COMPLETELY FREE - No paid libraries, MIT license
const PARTICLE_COUNT = 250;
const COLORS = ['#2E7D32', '#1565C0', '#00D9A0', '#FFD54F'];

function Particles() {
    const points = useRef<THREE.Points>(null);
    const [positions] = useState<Float32Array>(() =>
        new Float32Array(PARTICLE_COUNT * 3)
    );

    // Initialize positions randomly spread out
    useEffect(() => {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
        }
    }, [positions]);

    useFrame((state) => {
        if (!points.current) return;

        const time = state.clock.getElapsedTime();
        const scrollY = window.scrollY;
        const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);

        // Safety check for scrollProgress to be between 0 and 1
        const safeProgress = Math.min(Math.max(scrollProgress, 0), 1);

        const positionsArray = points.current.geometry.attributes.position.array as Float32Array;

        // Shape morphing based on scroll (free implementation)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            // const angle = (i / PARTICLE_COUNT) * Math.PI * 8 + time * 0.2;
            // const shapeFactor = Math.sin(safeProgress * Math.PI * 2);

            // Let's implement the logic from the user request precisely, 
            // but I need to make sure I'm writing to positionsArray correctly.
            // The user code seems to overwrite positions every frame, which is fine for morphing.

            const angle = (i / PARTICLE_COUNT) * Math.PI * 8 + time * 0.2;
            const shapeFactor = Math.sin(safeProgress * Math.PI * 2);

            // Morphing between shapes
            if (safeProgress < 0.2) {
                // Circle
                positionsArray[i3] = Math.cos(angle) * 5 + Math.sin(time + i) * 0.5;
                positionsArray[i3 + 1] = Math.sin(angle) * 5 + Math.cos(time + i * 0.7) * 0.5;
                positionsArray[i3 + 2] = 0;
            } else if (safeProgress < 0.4) {
                // Square
                const side = 5 + shapeFactor * 2;
                const sideIndex = Math.floor((i / PARTICLE_COUNT) * 4);
                const t = ((i / PARTICLE_COUNT) * 4) % 1;

                switch (sideIndex) {
                    case 0: // Top
                        positionsArray[i3] = -side / 2 + t * side;
                        positionsArray[i3 + 1] = -side / 2;
                        break;
                    case 1: // Right
                        positionsArray[i3] = side / 2;
                        positionsArray[i3 + 1] = -side / 2 + t * side;
                        break;
                    case 2: // Bottom
                        positionsArray[i3] = side / 2 - t * side;
                        positionsArray[i3 + 1] = side / 2;
                        break;
                    case 3: // Left
                        positionsArray[i3] = -side / 2;
                        positionsArray[i3 + 1] = side / 2 - t * side;
                        break;
                    default:
                        positionsArray[i3] = 0;
                        positionsArray[i3 + 1] = 0;
                }
                positionsArray[i3 + 2] = 0;
            } else if (safeProgress < 0.6) {
                // Diamond
                const diamondSize = 5 + shapeFactor * 2;
                positionsArray[i3] = diamondSize * Math.cos(angle) * Math.sqrt(2) / 2;
                positionsArray[i3 + 1] = diamondSize * Math.sin(angle) * Math.sqrt(2) / 2;
                positionsArray[i3 + 2] = 0;
            } else if (safeProgress < 0.8) {
                // DNA Helix
                const dnaRadius = 4 + shapeFactor * 2;
                const dnaHeight = 10;
                const dnaAngle = angle * 5;
                const dnaY = (i / PARTICLE_COUNT) * dnaHeight - dnaHeight / 2;

                positionsArray[i3] = dnaRadius * Math.cos(dnaAngle);
                positionsArray[i3 + 1] = dnaY;
                positionsArray[i3 + 2] = dnaRadius * Math.sin(dnaAngle);
            } else {
                // Spiral
                const spiralRadius = 4 + shapeFactor * 2;
                positionsArray[i3] = spiralRadius * Math.cos(angle) * (1 - shapeFactor);
                positionsArray[i3 + 1] = spiralRadius * Math.sin(angle) * (1 - shapeFactor);
                positionsArray[i3 + 2] = 0;
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#00D9A0"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
}

export function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true, antialias: true }}
            >
                <Particles />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
            </Canvas>
        </div>
    );
}
