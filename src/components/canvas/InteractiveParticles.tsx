import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function InteractiveParticles() {
    const count = 3000;
    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    // Generate positions for different shapes
    const [positionsSphere, positionsGrid, positionsDNA, positionsWave] = useMemo(() => {
        const sphere = new Float32Array(count * 3);
        const grid = new Float32Array(count * 3);
        const dna = new Float32Array(count * 3);
        const wave = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Sphere
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            sphere[i * 3] = 4 * Math.cos(theta) * Math.sin(phi);
            sphere[i * 3 + 1] = 4 * Math.sin(theta) * Math.sin(phi);
            sphere[i * 3 + 2] = 4 * Math.cos(phi);

            // Grid
            const step = Math.ceil(Math.cbrt(count));
            const gx = (i % step) - step / 2;
            const gy = (Math.floor(i / step) % step) - step / 2;
            const gz = (Math.floor(i / (step * step))) - step / 2;
            grid[i * 3] = gx * 0.8;
            grid[i * 3 + 1] = gy * 0.8;
            grid[i * 3 + 2] = gz * 0.8;

            // DNA Helix
            const t = i * 0.1;
            dna[i * 3] = Math.cos(t) * 2;
            dna[i * 3 + 1] = (i * 0.02) - 10;
            dna[i * 3 + 2] = Math.sin(t) * 2;

            // Wave
            const wx = (i / count) * 20 - 10;
            const wy = Math.sin(wx * 0.5) * 2;
            const wz = Math.cos(wx * 0.5) * 2;
            wave[i * 3] = wx;
            wave[i * 3 + 1] = wy;
            wave[i * 3 + 2] = wz;
        }
        return [sphere, grid, dna, wave];
    }, [count]);

    const currentPositions = useMemo(() => new Float32Array(positionsSphere), [positionsSphere]);

    // Ref to store target positions
    const targetPositions = useRef(positionsSphere);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const h = window.innerHeight;
            // Determine shape based on scroll section
            if (scrollY < h) targetPositions.current = positionsSphere;
            else if (scrollY < h * 2) targetPositions.current = positionsGrid;
            else if (scrollY < h * 3) targetPositions.current = positionsDNA;
            else targetPositions.current = positionsWave;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [positionsSphere, positionsGrid, positionsDNA, positionsWave]);

    useFrame((state) => {
        if (!mesh.current) return;

        // Lerp positions
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;
        const target = targetPositions.current;

        for (let i = 0; i < count * 3; i++) {
            // Smooth interpolation
            positions[i] += (target[i] - positions[i]) * 0.05;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Rotation
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.x += 0.0005;
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
                size={0.06}
                color="#00D9A0"
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
