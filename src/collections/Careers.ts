
import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
    slug: 'careers',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'department', 'location', 'type'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'department',
            type: 'text',
            required: true,
        },
        {
            name: 'location',
            type: 'text',
            defaultValue: 'Remote / Hybrid',
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Full-time', value: 'full-time' },
                { label: 'Contract', value: 'contract' },
                { label: 'Internship', value: 'internship' },
            ],
            defaultValue: 'full-time',
        },
        {
            name: 'description',
            type: 'richText',
            label: 'Job Description',
        },
        {
            name: 'requirements',
            type: 'richText',
            label: 'Requirements',
        },
        {
            name: 'applicationLink',
            type: 'text',
            label: 'Application URL or Email',
        }
    ],
}
