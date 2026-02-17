import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'client', 'industry', 'updatedAt'],
        preview: (doc: any) => `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/work/${doc.slug}`,
    },
    access: { read: () => true },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'client', type: 'text', required: true },
        { name: 'industry', type: 'text', required: true },
        { name: 'challenge', type: 'richText', required: true },
        { name: 'solution', type: 'richText', required: true },
        {
            name: 'results',
            type: 'array',
            fields: [
                { name: 'metric', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
                { name: 'description', type: 'text' },
            ],
        },
        {
            name: 'technologies',
            type: 'array',
            fields: [{ name: 'name', type: 'text', required: true }],
        },
        { name: 'testimonialQuote', type: 'textarea' },
        { name: 'testimonialAuthor', type: 'text' },
        { name: 'testimonialRole', type: 'text' },
        { name: 'beforeImage', type: 'upload', relationTo: 'media' },
        { name: 'afterImage', type: 'upload', relationTo: 'media' },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        {
            name: 'services',
            type: 'relationship',
            relationTo: 'services',
            hasMany: true,
        },
        { name: 'published', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
        { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    ],
}

export default CaseStudies
