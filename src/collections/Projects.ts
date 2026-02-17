import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'AI', value: 'AI' },
                { label: 'Data', value: 'Data' },
                { label: 'Strategy', value: 'Strategy' },
                { label: 'Digital', value: 'Digital' },
            ],
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'bgGradient',
            type: 'text',
            required: true,
            defaultValue: 'bg-gradient-to-br from-[#008F5D] to-[#004E8F]',
        },
        {
            name: 'metrics',
            type: 'array',
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'beforeImage',
            type: 'text',
            required: false,
        },
        {
            name: 'afterImage',
            type: 'text',
            required: false,
        },
    ],
}
