import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
        preview: (doc: any) => `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${doc.slug}`,
    },
    access: { read: () => true },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: { description: 'H1 - Primary page title' },
        },
        { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
        {
            name: 'metaDescription',
            type: 'textarea',
            label: 'Meta Description',
            admin: { description: 'Appears in search results. Keep under 160 characters.' },
        },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OpenGraph Image' },
        { name: 'ogTitle', type: 'text', label: 'OpenGraph Title' },
        { name: 'ogDescription', type: 'textarea', label: 'OpenGraph Description' },
        {
            name: 'targetKeywords',
            type: 'array',
            label: 'Target Keywords',
            fields: [
                { name: 'keyword', type: 'text', required: true },
                {
                    name: 'intent',
                    type: 'select',
                    options: [
                        { label: 'Informational', value: 'informational' },
                        { label: 'Commercial', value: 'commercial' },
                        { label: 'Transactional', value: 'transactional' },
                        { label: 'Navigational', value: 'navigational' },
                    ],
                    defaultValue: 'informational',
                },
            ],
        },
        {
            name: 'semanticKeywords',
            type: 'array',
            label: 'Semantic Keywords',
            admin: { description: 'Related terms for AI training data context' },
            fields: [{ name: 'term', type: 'text', required: true }],
        },
        {
            name: 'sections',
            type: 'blocks',
            blocks: [
                {
                    slug: 'heroSection',
                    fields: [
                        { name: 'heading', type: 'text', required: true },
                        { name: 'subheading', type: 'richText' },
                        {
                            name: 'ctaButtons',
                            type: 'array',
                            fields: [
                                { name: 'label', type: 'text', required: true },
                                { name: 'url', type: 'text', required: true },
                                {
                                    name: 'variant',
                                    type: 'select',
                                    options: [
                                        { label: 'Primary', value: 'primary' },
                                        { label: 'Secondary', value: 'secondary' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    slug: 'contentSection',
                    fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'content', type: 'richText', required: true },
                        { name: 'image', type: 'upload', relationTo: 'media' },
                        { name: 'imageAlt', type: 'text', label: 'Image Alt Text' },
                    ],
                },
                {
                    slug: 'faqSection',
                    fields: [
                        { name: 'title', type: 'text', defaultValue: 'Frequently Asked Questions' },
                        { name: 'questions', type: 'relationship', relationTo: 'faqs', hasMany: true },
                    ],
                },
            ],
        },
        {
            name: 'schemaType',
            type: 'select',
            options: [
                { label: 'WebPage', value: 'WebPage' },
                { label: 'Service', value: 'Service' },
                { label: 'AboutPage', value: 'AboutPage' },
                { label: 'ContactPage', value: 'ContactPage' },
                { label: 'FAQPage', value: 'FAQPage' },
            ],
            defaultValue: 'WebPage',
            admin: { position: 'sidebar' },
        },
        { name: 'published', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
        { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    ],
}
