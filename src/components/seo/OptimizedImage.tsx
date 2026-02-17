
"use client";

import { Media } from '@/payload-types';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
    image: Media | string; // Handle potentially string IDs if depth not populated, though mostly Media
    alt?: string;
    width?: number; // Optional if fill is used
    height?: number;
    priority?: boolean;
    className?: string;
    continent?: string; // For continent-specific images
    fill?: boolean;
}

export function OptimizedImage({
    image,
    alt,
    width,
    height,
    priority = false,
    className = '',
    continent,
    fill = false
}: OptimizedImageProps) {

    const [error, setError] = useState(false);

    // Handle case where image is just an ID (string)
    if (typeof image === 'string') {
        console.warn("OptimizedImage received ID string instead of Media object. Ensure depth is set or fetch populate.");
        return null; // Or render placeholder
    }

    if (!image || !image.url) return null;

    // Auto-generate alt text if not provided
    const finalAlt = alt || image.alt ||
        `VeeBran AI ${image.filename?.replace(/\.[^/.]+$/, '')}`;

    // Continent-specific image selection
    // (Future: Logic to select continent-specific variant if available in Media variants)
    const selectedImage = image;

    return (
        <figure className={`relative ${className} group overflow-hidden bg-vb-dark/50`}>
            {!error ? (
                <Image
                    src={selectedImage.url || ''}
                    alt={finalAlt}
                    width={!fill ? width || 800 : undefined}
                    height={!fill ? height || 600 : undefined}
                    fill={fill}
                    priority={priority}
                    className={`object-cover ${fill ? 'absolute inset-0 w-full h-full' : ''} transition-opacity duration-300 ${error ? 'opacity-0' : 'opacity-100'}`}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setError(true)}
                />
            ) : (
                <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-vb-dark via-vb-dark/80 to-vb-green/10 ${fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[200px]'}`}>
                    <span className="text-4xl mb-2 opacity-50">🌱</span>
                    <span className="text-xs text-vb-green/50 uppercase tracking-widest">Visual Intelligence</span>
                </div>
            )}

            {/* Caption for AEO (screen reader / generic visible if needed, but styling usually hidden by design, unless specific blog context) */}
            {/* We keep it visually hidden but accessible or use data-seo for bots if needed. 
          The User requested: "Caption (AEO Optimization)... mt-2 text-sm text-gray-400 text-center"
      */}
            {(image as any).caption && typeof (image as any).caption === 'string' && ( // Check if simple string or generic usage
                <figcaption
                    className="mt-2 text-xs text-gray-400 text-center sr-only group-hover:not-sr-only transition-all" // Revealing on hover for "visual intelligence" effect? Or just subtle?
                    itemProp="caption description"
                >
                    {(image as any).caption}
                </figcaption>
            )}

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ImageObject",
                        "name": finalAlt,
                        "description": (image as any).detailedDescription || finalAlt,
                        "contentUrl": selectedImage.url,
                        "caption": "VeeBran: " + finalAlt,
                        "representativeOfPage": priority ? "True" : "False",
                        "license": "© 2026 VeeBran. All rights reserved.",
                        ...(continent && { "contentLocation": continent })
                    })
                }}
            />
        </figure>
    );
}
