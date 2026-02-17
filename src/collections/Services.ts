import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'serviceId', 'updatedAt'],
        preview: (doc: any) => `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services#${doc.serviceId}`,
    },
    access: { read: () => true },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'serviceId', type: 'text', required: true, unique: true },
        { name: 'color', type: 'text', required: true, defaultValue: '#2E7D32' },
        { name: 'description', type: 'textarea', required: true },
        {
            name: 'offerings',
            type: 'array',
            fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
            name: 'outcomes',
            type: 'array',
            fields: [{ name: 'item', type: 'text', required: true }],
        },
        // AEO-optimized questions for featured snippets
        {
            name: 'commonQuestions',
            type: 'array',
            label: 'Common Questions (AEO)',
            admin: { description: 'Questions people ask about this service — drives featured snippets' },
            fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
            ],
        },
        {
            name: 'technologies',
            type: 'array',
            fields: [{ name: 'name', type: 'text', required: true }],
        },
        {
            name: 'pricingModel',
            type: 'select',
            options: [
                { label: 'Project-Based', value: 'project' },
                { label: 'Monthly Retainer', value: 'retainer' },
                { label: 'Hourly', value: 'hourly' },
            ],
        },
        { name: 'startingPrice', type: 'text', admin: { description: 'e.g. "Starting at $5,000"' } },
    ],
}
