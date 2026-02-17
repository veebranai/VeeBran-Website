import { MetadataRoute } from 'next'
import { REGION_CONTENT } from '@/lib/seo-content'

export default function sitemap(): MetadataRoute.Sitemap {
    const regionUrls = Object.keys(REGION_CONTENT).map((region) => ({
        url: `https://veebran.com/ai/${region}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: 'https://veebran.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://veebran.com/services',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://veebran.com/work',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://veebran.com/company',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://veebran.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://veebran.com/ai',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        ...regionUrls,
        {
            url: 'https://veebran.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://veebran.com/team',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://veebran.com/careers',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: 'https://veebran.com/news',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
    ]
}
