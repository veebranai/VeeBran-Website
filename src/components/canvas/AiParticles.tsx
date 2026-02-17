import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type AiParticlesProps = {
    state: 'idle' | 'processing' | 'complete';
};

export function AiParticles({ state }: AiParticlesProps) {
    const count = 500;
    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    // Generate positions for different shapes
    const [positionsSphere, positionsChaos, positionsStructure] = useMemo(() => {
        const sphere = new Float32Array(count * 3);
        const chaos = new Float32Array(count * 3);
        const structure = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Sphere (Idle) - Increased radius and better spread
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            // Radius 6 instead of 4
            sphere[i * 3] = 6 * Math.cos(theta) * Math.sin(phi);
            sphere[i * 3 + 1] = 6 * Math.sin(theta) * Math.sin(phi);
            sphere[i * 3 + 2] = 6 * Math.cos(phi);

            // Chaos (Processing) - Wider spread
            chaos[i * 3] = (Math.random() - 0.5) * 20;
            chaos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            chaos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Structure (Complete) - Cubic Grid for obvious shape change
            // 8x8x8 grid approx 512 particles
            const side = Math.ceil(Math.pow(count, 1 / 3));
            const spacing = 2.5;
            const offset = (side * spacing) / 2;

            const x = i % side;
            const y = Math.floor(i / side) % side;
            const z = Math.floor(i / (side * side));

            structure[i * 3] = x * spacing - offset;
            structure[i * 3 + 1] = y * spacing - offset;
            structure[i * 3 + 2] = z * spacing - offset;
        }
        return [sphere, chaos, structure];
    }, [count]);

    const currentPositions = useMemo(() => new Float32Array(positionsSphere), [positionsSphere]);
    const targetPositions = useRef(positionsSphere);

    useEffect(() => {
        if (state === 'idle') targetPositions.current = positionsSphere;
        else if (state === 'processing') targetPositions.current = positionsChaos;
        else if (state === 'complete') targetPositions.current = positionsStructure;
    }, [state, positionsSphere, positionsChaos, positionsStructure]);

    useFrame((stateThree) => {
        if (!mesh.current) return;

        // Lerp positions
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;
        const target = targetPositions.current;

        // Speed depends on state - faster for clearer transition
        const lerpFactor = state === 'processing' ? 0.08 : 0.06;

        for (let i = 0; i < count * 3; i++) {
            positions[i] += (target[i] - positions[i]) * lerpFactor;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Continuous Rotation
        mesh.current.rotation.y += 0.002;
        if (state === 'processing') {
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.z += 0.01;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={currentPositions}
                    itemSize={3}
                    args={[currentPositions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15} // Larger size for visibility
                color={state === 'processing' ? "#00D9A0" : (state === 'complete' ? "#008F5D" : "#004E8F")}
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
