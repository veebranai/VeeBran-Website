"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className
}: BeforeAfterSliderProps) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setPosition(newPosition);
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleTouchStart = () => setIsDragging(true);

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) handleMove(e.touches[0].clientX);
        };

        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchend', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full aspect-video overflow-hidden rounded-2xl select-none group border border-white/10", className)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Before Image (Background) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${beforeImage})` }}
            />

            {/* After Image (Overlay with Clip Path) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${afterImage})`,
                    clipPath: `inset(0 0 0 ${position}%)`
                }}
            />

            {/* Divider Line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${position}%` }}
            >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-vb-dark shadow-lg transition-transform group-hover:scale-110">
                    <GripVertical size={20} />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-lg text-sm font-bold z-10 pointer-events-none">
                {beforeLabel}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-lg text-sm font-bold z-10 pointer-events-none">
                {afterLabel}
            </div>
        </div>
    );
}
