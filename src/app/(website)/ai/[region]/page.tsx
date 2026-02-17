
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AiPageClient } from '@/components/pages/AiPageClient';
import { REGION_CONTENT, GLOBAL_SCHEMA } from '@/lib/seo-content';

type Props = {
    params: { region: string };
};

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const regionData = REGION_CONTENT[params.region];

    if (!regionData) {
        return {
            title: 'VeeBran AI: Global Intelligent Proposal Generator',
            description: 'World\'s first AI proposal engine. Instant quotes for global markets.',
        };
    }

    return {
        title: regionData.title,
        description: regionData.description,
        alternates: {
            canonical: `https://veebran.com/ai/${params.region}`,
            languages: Object.entries(REGION_CONTENT).reduce((acc, [key, val]) => {
                acc[val.hreflang] = `https://veebran.com/ai/${key}`;
                return acc;
            }, {} as Record<string, string>)
        },
        openGraph: {
            title: regionData.title,
            description: regionData.description,
            type: 'website',
            locale: regionData.hreflang,
        }
    };
}

// 2. Server Component for the Region Page
export default function RegionPage({ params }: Props) {
    const regionData = REGION_CONTENT[params.region];

    if (!regionData) {
        notFound();
    }

    // Inject Schema JSON-LD
    const jsonLd = {
        ...GLOBAL_SCHEMA,
        "description": regionData.description, // Override global desc
        "offers": {
            ...GLOBAL_SCHEMA.offers,
            "priceCurrency": regionData.currency // Override currency
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AiPageClient initialRegion={regionData} />
        </>
    );
}

// 3. Static Params
export async function generateStaticParams() {
    return Object.keys(REGION_CONTENT).map((region) => ({
        region,
    }));
}
