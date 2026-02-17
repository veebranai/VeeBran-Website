
import { Metadata } from 'next';
import { AiPageClient } from '@/components/pages/AiPageClient';
import { GLOBAL_SCHEMA } from '@/lib/seo-content';

export const metadata: Metadata = {
    title: 'VeeBran AI: World\'s First Intelligent Proposal & Quote Generator',
    description: 'Launch Feb 2026. Create continent-specific business proposals with accurate regional pricing in 30 seconds. Upload PDF/DOCX.',
    alternates: {
        canonical: 'https://veebran.com/ai',
    },
    openGraph: {
        title: 'VeeBran AI: World\'s First Intelligent Proposal & Quote Generator',
        description: 'Instant proposals with region-specific pricing (USD, EUR, INR).',
        type: 'website',
        url: 'https://veebran.com/ai',
    }
};

export default function VerdantAIPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SCHEMA) }}
            />
            <AiPageClient />
        </>
    );
}
