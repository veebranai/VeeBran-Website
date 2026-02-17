export interface RegionContent {
    id: string; // url slug
    title: string;
    description: string;
    currency: string;
    keyClaims: string[];
    localProof: {
        title: string;
        desc: string;
        testimonial: {
            quote: string;
            author: string;
        };
    };
    compliance: string[];
    hreflang: string;
}

export const REGION_CONTENT: Record<string, RegionContent> = {
    'north-america': {
        id: 'north-america',
        title: 'VeeBran AI: Instant Proposals with North American Market Precision',
        description: 'World\'s first AI proposal generator. Get USD-quoted proposals in 30 seconds. Trusted by Fortune 500 innovators across USA & Canada.',
        currency: 'USD',
        hreflang: 'en-us',
        keyClaims: [
            "Pricing calibrated to Silicon Valley, NYC, Toronto standards",
            "Average proposal value: $125K-$750K USD",
            "92% client retention rate among North American enterprises"
        ],
        localProof: {
            title: "HealthTech AI Platform",
            desc: "$420K proposal generated in 28 seconds for Boston client",
            testimonial: {
                quote: "As a Chicago-based CFO, VeeBran AI's USD-accurate quote saved us 3 weeks of vendor negotiations.",
                author: "Michael R., TechStart Inc."
            }
        },
        compliance: ["HIPAA", "SOC 2", "CCPA"]
    },
    'europe': {
        id: 'europe',
        title: 'VeeBran AI: GDPR-Compliant Proposals for European Enterprises',
        description: 'Europe\'s first AI proposal engine. EUR-quoted proposals with GDPR compliance. Trusted by Berlin, London, Paris innovators.',
        currency: 'EUR',
        hreflang: 'en-gb', // and others
        keyClaims: [
            "Pricing aligned with DACH, Benelux, Nordics market rates",
            "GDPR-by-design document processing",
            "Multi-currency support: EUR, GBP, CHF"
        ],
        localProof: {
            title: "FinTech Compliance Suite",
            desc: "€380K proposal for Frankfurt bank (generated while sipping espresso)",
            testimonial: {
                quote: "VeeBran AI understood our German procurement requirements instantly. No back-and-forth.",
                author: "Lena S., Munich Digital"
            }
        },
        compliance: ["GDPR Article 32", "EU AI Act"]
    },
    'asia': {
        id: 'asia',
        title: 'VeeBran AI: Asia\'s Smartest Proposal Generator - INR to AUD Precision',
        description: 'First AI proposal engine built for Asian markets. Get accurate quotes in INR, SGD, AUD. Trusted across Bangalore, Singapore, Sydney.',
        currency: 'INR',
        hreflang: 'en-in',
        keyClaims: [
            "India-specific pricing: 60% cost advantage vs. Western vendors",
            "ASEAN compliance frameworks pre-loaded",
            "Supports Jio, Airtel, Singtel infrastructure specs"
        ],
        localProof: {
            title: "E-commerce AI for Flipkart Seller",
            desc: "₹28L proposal generated during lunch break in Bangalore",
            testimonial: {
                quote: "Finally! An AI that understands Indian budget cycles and festival timelines.",
                author: "Rajiv M., Delhi Tech"
            }
        },
        compliance: ["MeitY", "PDPA", "Australian Privacy Principles"]
    },
    'latin-america': {
        id: 'latin-america',
        title: 'VeeBran AI: Propuestas Inteligentes para América Latina',
        description: 'Primer generador de propuestas con IA para LATAM. Cotizaciones en BRL, MXN, ARS. Precisión para São Paulo, Ciudad de México, Buenos Aires.',
        currency: 'BRL',
        hreflang: 'es-mx',
        keyClaims: [
            "Precios calibrados al mercado brasileño/mexicano/argentino",
            "Soporte para pagos en cuotas (Brazil), facturación electrónica (Mexico)",
            "Entiende ciclos de presupuesto gubernamental LATAM"
        ],
        localProof: {
            title: "Plataforma de Logística para Mercado Libre",
            desc: "Propuesta de R$1.2M generada en 45 segundos",
            testimonial: {
                quote: "¡Increíble! La propuesta incluyó impuestos brasileños correctamente.",
                author: "Carlos F., São Paulo"
            }
        },
        compliance: ["LGPD (Brazil)", "NOM (Mexico)"]
    },
    'africa': {
        id: 'africa',
        title: 'VeeBran AI: Africa\'s First Intelligent Proposal Engine',
        description: 'Get accurate ZAR, NGN, KES quotes instantly. Built for Johannesburg, Lagos, Nairobi innovators. Mobile-optimized for African connectivity.',
        currency: 'ZAR',
        hreflang: 'en-za',
        keyClaims: [
            "Pricing for African startup ecosystems & enterprise markets",
            "Offline-capable proposal generation (low-bandwidth optimized)",
            "Supports M-Pesa, Flutterwave payment integrations"
        ],
        localProof: {
            title: "AgriTech Platform for Kenyan Farmers",
            desc: "KES 15M proposal generated on mobile data",
            testimonial: {
                quote: "VeeBran AI understood our Nigerian budget constraints AND delivered enterprise-grade scope.",
                author: "Amina B., Lagos Tech"
            }
        },
        compliance: ["POPIA (SA)", "NDPR (Nigeria)"]
    }
};

export const GLOBAL_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VeeBran AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1287"
    },
    "description": "World's first intelligent proposal and quote generator. Upload project scope. Get continent-specific proposal with accurate pricing in 30 seconds.",
    "featureList": [
        "Continent-specific pricing engine",
        "PDF/DOCX document analysis",
        "GDPR/HIPAA/MeitY compliant",
        "12 language support",
        "Real-time quote generation"
    ],
    "releaseDate": "2026-02-01",
    "softwareVersion": "1.0",
    "creator": {
        "@type": "Organization",
        "name": "VeeBran",
        "url": "https://veebran.com"
    }
};
