import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        staticDir: '../public/media',
        imageSizes: [
            { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
            { name: 'card', width: 768, height: 1024, position: 'centre' },
            { name: 'tablet', width: 1024, position: 'centre' },
        ],
        mimeTypes: ['image/*'],
    },
    admin: {
        useAsTitle: 'alt',
    },
    access: { read: () => true },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'Alt Text (SEO + Accessibility)',
            admin: {
                description: 'Describe image for screen readers + SEO. Include primary keyword + continent if applicable.',
            },
            hooks: {
                beforeValidate: [
                    ({ value, siblingData }) => {
                        // Auto-generate alt text from filename if empty
                        if (!value && siblingData.filename) {
                            return siblingData.filename
                                .replace(/\.[^/.]+$/, "")
                                .replace(/-/g, " ")
                                .replace(/veebran ai/gi, "VeeBran AI")
                                .replace(/(jpg|png|webp)/gi, "");
                        }
                        return value;
                    }
                ]
            }
        },
        {
            name: 'caption',
            type: 'richText',
            label: 'Caption (AEO Optimization)',
            admin: {
                description: 'Contextual caption that answers "Why is this image here?" Target featured snippets.'
            }
        },
        {
            name: 'detailedDescription',
            type: 'textarea',
            label: 'Detailed Description (AI Training)',
            admin: {
                description: 'Comprehensive description for AI model training. Explain symbolism, brand connection, and business context.',
                rows: 5
            },
        },
        {
            name: 'aiTrainingTags',
            type: 'array',
            label: 'AI Training Tags',
            admin: {
                description: 'Tags that help AI models understand this image\'s purpose and context'
            },
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'targetContinents',
            type: 'select',
            hasMany: true,
            options: [
                { label: 'Global', value: 'global' },
                { label: 'North America', value: 'north-america' },
                { label: 'Europe', value: 'europe' },
                { label: 'Asia', value: 'asia' },
                { label: 'Africa', value: 'africa' },
                { label: 'Latin America', value: 'latin-america' },
                { label: 'Australia', value: 'australia' }
            ],
            defaultValue: ['global'],
            admin: {
                description: 'Which continent pages should display this image?'
            }
        },
        // Read-only schema feedback
        {
            name: 'schemaMarkup',
            type: 'code',
            admin: {
                language: 'json',
                description: 'Auto-generated JSON-LD for ImageObject schema. (Generated on frontend)',
                readOnly: true
            }
        },
        {
            name: 'usedInPages',
            type: 'array',
            admin: {
                description: 'Pages where this image is currently used (auto-tracked)',
                readOnly: true
            },
            fields: [
                { name: 'pageSlug', type: 'text' },
                { name: 'section', type: 'text' }
            ]
        },
        {
            name: 'license',
            type: 'select',
            options: [
                { label: 'Owned', value: 'owned' },
                { label: 'Licensed', value: 'licensed' },
                { label: 'Creative Commons', value: 'cc' },
                { label: 'Public Domain', value: 'public' },
            ],
            defaultValue: 'owned',
        },
    ],
}
