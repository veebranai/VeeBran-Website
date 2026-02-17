
export interface RegionalPricing {
    region: 'india' | 'usa' | 'uk' | 'europe' | 'asia' | 'north-america' | 'south-america' | 'africa' | 'oceania' | 'antarctica' | 'global';
    hourlyRate: { min: number; max: number };
    currency: string;
    markup: number;
    discountThreshold: number;
}

export const REGIONAL_STANDARDS: Record<string, RegionalPricing> = {
    india: {
        region: 'india',
        hourlyRate: { min: 25, max: 45 },
        currency: 'USD',
        markup: 15,
        discountThreshold: 160
    },
    asia: {
        region: 'asia',
        hourlyRate: { min: 30, max: 55 },
        currency: 'USD',
        markup: 15,
        discountThreshold: 160
    },
    'north-america': {
        region: 'north-america',
        hourlyRate: { min: 110, max: 180 },
        currency: 'USD',
        markup: 25,
        discountThreshold: 120
    },
    europe: {
        region: 'europe',
        hourlyRate: { min: 90, max: 160 },
        currency: 'EUR',
        markup: 22,
        discountThreshold: 130
    },
    'south-america': {
        region: 'south-america',
        hourlyRate: { min: 40, max: 75 },
        currency: 'USD',
        markup: 18,
        discountThreshold: 150
    },
    africa: {
        region: 'africa',
        hourlyRate: { min: 35, max: 60 },
        currency: 'USD',
        markup: 15,
        discountThreshold: 160
    },
    oceania: {
        region: 'oceania',
        hourlyRate: { min: 85, max: 145 },
        currency: 'AUD',
        markup: 20,
        discountThreshold: 140
    },
    antarctica: {
        region: 'antarctica',
        hourlyRate: { min: 200, max: 350 },
        currency: 'USD',
        markup: 30,
        discountThreshold: 100
    },
    global: {
        region: 'global',
        hourlyRate: { min: 75, max: 140 },
        currency: 'USD',
        markup: 20,
        discountThreshold: 150
    }
};

// Auto-detect region from IP (free service)
export async function detectRegionFromIP(): Promise<string> {
    try {
        // Free IP geolocation service
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const country = data.country_code?.toLowerCase();
        const continent = data.continent_code?.toLowerCase();

        // Detailed mapping
        if (country === 'in') return 'india';

        switch (continent) {
            case 'na': return 'north-america';
            case 'eu': return 'europe';
            case 'as': return 'asia';
            case 'sa': return 'south-america';
            case 'af': return 'africa';
            case 'oc': return 'oceania';
            case 'an': return 'antarctica';
            default: return 'global';
        }
    } catch (error) {
        console.error('Region detection failed:', error);
        return 'global'; // Default fallback
    }
}

// Calculate project quote based on scope and region
export function calculateQuote(
    estimatedHours: number,
    region: string,
    complexity: 'low' | 'medium' | 'high'
): {
    baseRate: number;
    totalHours: number;
    subtotal: number;
    markup: number;
    total: number;
    currency: string;
} {
    const pricing = REGIONAL_STANDARDS[region] || REGIONAL_STANDARDS.global;
    const rateRange = pricing.hourlyRate;

    // Adjust rate based on complexity
    const complexityMultiplier = complexity === 'high' ? 1.3 : complexity === 'medium' ? 1.1 : 1.0;
    const baseRate = ((rateRange.min + rateRange.max) / 2) * complexityMultiplier;

    // Apply volume discount if applicable
    const totalHours = estimatedHours;
    const discount = totalHours > pricing.discountThreshold ? 0.1 : 0; // 10% discount

    const subtotal = baseRate * totalHours * (1 - discount);
    const markupAmount = subtotal * (pricing.markup / 100);
    const total = subtotal + markupAmount;

    return {
        baseRate: Math.round(baseRate),
        totalHours,
        subtotal: Math.round(subtotal),
        markup: Math.round(markupAmount),
        total: Math.round(total),
        currency: pricing.currency
    };
}
