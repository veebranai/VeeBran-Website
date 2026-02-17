// import { CollectionConfig } from 'payload/types'

export const Services: any = {
    slug: 'services',
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
            name: 'serviceId', // 'strategy', 'ai', etc.
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'color',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'offerings',
            type: 'array',
            fields: [
                {
                    name: 'item',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'outcomes',
            type: 'array',
            fields: [
                {
                    name: 'item',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
