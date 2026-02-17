import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
    slug: 'faqs',
    admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'category', 'updatedAt'],
    },
    access: { read: () => true },
    fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'General', value: 'general' },
                { label: 'Pricing', value: 'pricing' },
                { label: 'Process', value: 'process' },
                { label: 'Technology', value: 'technology' },
                { label: 'Services', value: 'services' },
            ],
            defaultValue: 'general',
        },
        {
            name: 'searchVolume',
            type: 'number',
            admin: { description: 'Monthly search volume for this question' },
        },
        {
            name: 'difficulty',
            type: 'select',
            options: [
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
            ],
            admin: { description: 'How hard it is to rank for this question' },
        },
        {
            name: 'voiceVariants',
            type: 'array',
            admin: { description: 'How people phrase this question via voice search' },
            fields: [{ name: 'variant', type: 'text', required: true }],
        },
        { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    ],
}
