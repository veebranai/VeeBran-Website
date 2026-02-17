import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
    slug: 'team',
    admin: {
        useAsTitle: 'name',
    },
    access: { read: () => true },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
        { name: 'color', type: 'text', required: true, defaultValue: '#008F5D' },
        {
            name: 'skills',
            type: 'array',
            fields: [{ name: 'skill', type: 'text', required: true }],
        },
        // E-E-A-T authority signals
        { name: 'linkedIn', type: 'text', label: 'LinkedIn URL' },
        { name: 'experience', type: 'textarea', admin: { description: 'Years of experience and notable positions' } },
        {
            name: 'education',
            type: 'array',
            fields: [
                { name: 'institution', type: 'text', required: true },
                { name: 'degree', type: 'text', required: true },
            ],
        },
        {
            name: 'certifications',
            type: 'array',
            fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'issuer', type: 'text' },
            ],
        },
        {
            name: 'publications',
            type: 'array',
            admin: { description: 'Articles, talks, or papers for E-E-A-T' },
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'url', type: 'text' },
            ],
        },
    ],
}
