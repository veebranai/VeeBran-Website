'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// ===== VEEBRAN BRAND COLORS =====
const BRAND_COLORS = {
    green: '#2E7D32',      // Growth
    blue: '#1565C0',       // Trust
    teal: '#00D9A0',       // Innovation
    yellow: '#FFD54F',     // Energy
    dark: '#0A0F0D',       // Foundation
};

// ===== VEEBRAN PARTICLE SHAPES =====
type VeeBranShape =
    | 'seedling'      // Growth - sprouting seedling
    | 'neural'        // Connection - neural network
    | 'fractal'       // Innovation - branching fractal
    | 'precision'     // Precision - geometric grid
    | 'energy';       // Energy - flowing waveform

interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    baseSize: number;
    speedX: number;
    speedY: number;
    speedZ: number;
    color: string;
    depth: number;
    animationState: VeeBranShape;
    phase: number;        // Animation phase (0-1)
    branchLevel: number;  // For fractal branching
    connectionStrength: number; // For neural connections
}

// ===== VEEBRAN PARTICLE SYSTEM CONFIGURATION =====
const PARTICLE_COUNT = 800;  // Adaptive: 500-1200 based on device
const MAX_DEPTH = 200;
const MIN_DEPTH = 50;
const MORPH_DURATION = 2.0; // Seconds to morph between shapes

// ===== SHAPE CONFIGURATIONS =====
const SHAPE_CONFIGS = {
    seedling: {
        radius: 8,
        branches: 3,
        growthSpeed: 0.8,
        color: BRAND_COLORS.green,
        description: "Growth & New Beginnings",
    },
    neural: {
        radius: 12,
        connections: 8,
        pulseSpeed: 1.2,
        color: BRAND_COLORS.blue,
        description: "Connection & Intelligence",
    },
    fractal: {
        radius: 10,
        depth: 4,
        branchAngle: Math.PI / 4,
        color: BRAND_COLORS.teal,
        description: "Innovation & Possibilities",
    },
    precision: {
        radius: 15,
        gridSpacing: 3,
        rotationSpeed: 0.5,
        color: BRAND_COLORS.yellow,
        description: "Structure & Accuracy",
    },
    energy: {
        radius: 18,
        waveFrequency: 3,
        waveAmplitude: 4,
        color: BRAND_COLORS.teal,
        description: "Momentum & Transformation",
    },
};

function VeeBranParticles() {
    const { camera, size } = useThree();
    const points = useRef<THREE.Points>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [targetShape, setTargetShape] = useState<VeeBranShape>('seedling');
    const [morphProgress, setMorphProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // ===== INITIALIZE PARTICLES =====
    useEffect(() => {
        const initParticles = () => {
            const newParticles: Particle[] = [];

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // VEEBRAN APPROACH: Each particle has unique characteristics
                const shapeType: VeeBranShape =
                    i % 5 === 0 ? 'seedling' :
                        i % 5 === 1 ? 'neural' :
                            i % 5 === 2 ? 'fractal' :
                                i % 5 === 3 ? 'precision' : 'energy';

                newParticles.push({
                    x: (Math.random() - 0.5) * 150,
                    y: (Math.random() - 0.5) * 150,
                    z: (Math.random() - 0.5) * MAX_DEPTH,
                    size: Math.random() * 1.2 + 0.8,
                    baseSize: Math.random() * 1.2 + 0.8,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    speedZ: (Math.random() - 0.5) * 0.15,
                    color: SHAPE_CONFIGS[shapeType].color,
                    depth: Math.random() * (MAX_DEPTH - MIN_DEPTH) + MIN_DEPTH,
                    animationState: shapeType,
                    phase: Math.random() * Math.PI * 2,
                    branchLevel: Math.floor(Math.random() * 4),
                    connectionStrength: Math.random(),
                });
            }

            setParticles(newParticles);
        };

        initParticles();
        setIsMobile(window.innerWidth < 768);

        // Cleanup on unmount
        return () => {
            setParticles([]);
        };
    }, []);

    // ===== HANDLE SCROLL-BASED SHAPE MORPHING =====
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = scrollY / maxScroll;

            // VEEBRAN APPROACH: Map scroll to shape progression
            const shapeIndex = Math.floor(scrollProgress * 5) % 5;
            const shapes: VeeBranShape[] = ['seedling', 'neural', 'fractal', 'precision', 'energy'];

            setTargetShape(shapes[shapeIndex]);
            setMorphProgress(scrollProgress * 5 % 1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ===== HANDLE MOUSE INTERACTION =====
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // ===== PHYSICS-BASED ANIMATION =====
    useFrame((state, delta) => {
        if (!points.current || particles.length < PARTICLE_COUNT) return;

        const positions = points.current.geometry.attributes.position as THREE.BufferAttribute;
        const colors = points.current.geometry.attributes.color as THREE.BufferAttribute;
        const time = state.clock.getElapsedTime();
        setCurrentTime(time);

        // VEEBRAN APPROACH: Mouse interaction with natural repulsion
        const mouseEffect = {
            x: (mousePosition.x - 0.5) * 2,
            y: (mousePosition.y - 0.5) * 2,
            strength: Math.min(1, Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y))
        };

        // Update each particle
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const p = particles[i];

            // VEEBRAN APPROACH: Shape-specific physics
            switch (p.animationState) {
                case 'seedling':
                    // Seedling: Growth pattern with upward momentum
                    p.phase += delta * SHAPE_CONFIGS.seedling.growthSpeed;
                    const growthFactor = Math.sin(p.phase) * 0.5 + 0.5;

                    p.x = Math.cos(p.phase * 2) * SHAPE_CONFIGS.seedling.radius * growthFactor;
                    p.y = Math.sin(p.phase) * SHAPE_CONFIGS.seedling.radius * growthFactor + growthFactor * 10;
                    p.z = Math.cos(p.phase * 1.5) * 5;
                    break;

                case 'neural':
                    // Neural: Pulsing network with connection points
                    p.phase += delta * SHAPE_CONFIGS.neural.pulseSpeed;
                    const pulse = Math.sin(p.phase) * 0.3 + 0.7;

                    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 * SHAPE_CONFIGS.neural.connections;
                    p.x = Math.cos(angle) * SHAPE_CONFIGS.neural.radius * pulse;
                    p.y = Math.sin(angle) * SHAPE_CONFIGS.neural.radius * pulse;
                    p.z = Math.sin(p.phase * 3) * 8;
                    break;

                case 'fractal':
                    // Fractal: Branching tree structure
                    p.phase += delta * 0.6;

                    // Create fractal branching based on branch level
                    const branchAngle = p.branchLevel * SHAPE_CONFIGS.fractal.branchAngle;
                    const branchRadius = SHAPE_CONFIGS.fractal.radius * (1 - p.branchLevel / 4);

                    p.x = Math.cos(p.phase + branchAngle) * branchRadius;
                    p.y = Math.sin(p.phase + branchAngle) * branchRadius;
                    p.z = Math.cos(p.phase * 2) * 6;
                    break;

                case 'precision':
                    // Precision: Grid-based geometric pattern
                    p.phase += delta * SHAPE_CONFIGS.precision.rotationSpeed;

                    // Create grid positions
                    const gridX = ((i % 10) - 5) * SHAPE_CONFIGS.precision.gridSpacing;
                    const gridY = (Math.floor(i / 10) % 10 - 5) * SHAPE_CONFIGS.precision.gridSpacing;

                    // Rotate grid
                    const cosRot = Math.cos(p.phase);
                    const sinRot = Math.sin(p.phase);

                    p.x = gridX * cosRot - gridY * sinRot;
                    p.y = gridX * sinRot + gridY * cosRot;
                    p.z = Math.sin(p.phase * 4) * 4;
                    break;

                case 'energy':
                    // Energy: Flowing waveform with dynamic movement
                    p.phase += delta * 0.9;

                    const waveProgress = (i / PARTICLE_COUNT + time * 0.2) % 1;
                    const waveHeight = Math.sin(waveProgress * Math.PI * SHAPE_CONFIGS.energy.waveFrequency) *
                        SHAPE_CONFIGS.energy.waveAmplitude;

                    p.x = (waveProgress - 0.5) * SHAPE_CONFIGS.energy.radius * 2;
                    p.y = waveHeight;
                    p.z = Math.cos(p.phase * 5) * 8;
                    break;
            }

            // VEEBRAN APPROACH: Natural physics with boundaries
            p.x += p.speedX;
            p.y += p.speedY;
            p.z += p.speedZ;

            // Boundary collision with bounce
            if (Math.abs(p.x) > 80) p.speedX *= -0.9;
            if (Math.abs(p.y) > 80) p.speedY *= -0.9;
            if (p.z > MAX_DEPTH || p.z < MIN_DEPTH) p.speedZ *= -0.9;

            // Apply mouse repulsion (natural interaction)
            const dx = p.x - mouseEffect.x * 100;
            const dy = p.y - mouseEffect.y * 100;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
                const repulsion = (50 - distance) / 50 * 0.5;
                p.speedX += (dx / distance) * repulsion;
                p.speedY += (dy / distance) * repulsion;
            }

            // Damping for natural movement
            p.speedX *= 0.98;
            p.speedY *= 0.98;
            p.speedZ *= 0.98;

            // Update position array
            positions.array[i3] = p.x;
            positions.array[i3 + 1] = p.y;
            positions.array[i3 + 2] = p.z;

            // Update color with dynamic hue shift
            const hue = parseInt(p.color.slice(1), 16);
            const r = (hue >> 16) & 0xff;
            const g = (hue >> 8) & 0xff;
            const b = hue & 0xff;

            colors.array[i3] = r / 255;
            colors.array[i3 + 1] = g / 255;
            colors.array[i3 + 2] = b / 255;
        }

        positions.needsUpdate = true;
        colors.needsUpdate = true;
    });

    // ===== MORPH BETWEEN SHAPES =====
    const morphParticles = useCallback(() => {
        if (morphProgress >= 1) {
            // Complete morph - update all particles to new shape
            setParticles(prev =>
                prev.map(p => ({
                    ...p,
                    animationState: targetShape,
                    phase: Math.random() * Math.PI * 2,
                }))
            );
        }
    }, [morphProgress, targetShape]);

    useEffect(() => {
        morphParticles();
    }, [morphParticles]);

    return (
        <points ref={points} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array(PARTICLE_COUNT * 3), 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[new Float32Array(PARTICLE_COUNT * 3), 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={1.2}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.9}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={true}
            />
        </points>
    );
}

import { WebGLErrorBoundary } from "@/components/common/WebGLErrorBoundary";

// ... (existing imports)

// ===== VEEBRAN PARTICLE BACKGROUND COMPONENT =====
export function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0">
            <WebGLErrorBoundary fallback={<div className="w-full h-full bg-brand-dark" />}>
                <Canvas
                    camera={{ position: [0, 0, 180], fov: 75 }}
                    style={{
                        background: 'transparent',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                    dpr={[1, 2]} // Adaptive pixel ratio
                >
                    <color attach="background" args={[BRAND_COLORS.dark]} />
                    <VeeBranParticles />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                    />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[50, 50, 50]} intensity={1.5} color={BRAND_COLORS.teal} />
                    <pointLight position={[-50, -50, -50]} intensity={0.8} color={BRAND_COLORS.green} />
                </Canvas>
            </WebGLErrorBoundary>

            {/* VEEBRAN BRAND WATERMARK - Subtle overlay */}
            <div className="absolute bottom-4 left-4 text-xs text-brand-teal/30 font-mono pointer-events-none">
                VeeBran Particle System v1.0
            </div>
        </div>
    );
}

// ===== SHAPE INDICATOR - Shows current shape =====
export function ShapeIndicator() {
    const [currentShape, setCurrentShape] = useState<VeeBranShape>('seedling');
    const [shapeName, setShapeName] = useState('Growth');
    const [shapeDescription, setShapeDescription] = useState('New Beginnings');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = scrollY / maxScroll;

            const shapeIndex = Math.floor(scrollProgress * 5) % 5;
            const shapes: VeeBranShape[] = ['seedling', 'neural', 'fractal', 'precision', 'energy'];
            const shapeNames = ['🌱 Growth', '🕸️ Connection', '🌳 Innovation', '⚡ Precision', '💫 Energy'];
            const descriptions = [
                'New Beginnings',
                'Intelligent Networks',
                'Branching Possibilities',
                'Structured Excellence',
                'Transformative Momentum'
            ];

            setCurrentShape(shapes[shapeIndex]);
            setShapeName(shapeNames[shapeIndex]);
            setShapeDescription(descriptions[shapeIndex]);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 bg-brand-dark/80 backdrop-blur-sm border border-brand-green/30 rounded-xl p-4 shadow-lg pointer-events-none">
            <div className="flex items-center gap-3">
                <div className="text-2xl">
                    {currentShape === 'seedling' && '🌱'}
                    {currentShape === 'neural' && '🕸️'}
                    {currentShape === 'fractal' && '🌳'}
                    {currentShape === 'precision' && '⚡'}
                    {currentShape === 'energy' && '💫'}
                </div>
                <div>
                    <div className="font-bold text-brand-teal text-sm">{shapeName}</div>
                    <div className="text-xs text-gray-400">{shapeDescription}</div>
                </div>
            </div>
        </div>
    );
}
