// import { CollectionConfig } from 'payload/types'

export const Team: any = {
    slug: 'team',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'text',
            required: true,
        },
        {
            name: 'bio',
            type: 'textarea',
            required: true,
        },
        {
            name: 'color', // Hex code for team member theme
            type: 'text',
            required: true,
            defaultValue: '#008F5D',
        },
        {
            name: 'skills',
            type: 'array',
            fields: [
                {
                    name: 'skill',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
