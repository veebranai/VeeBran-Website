
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedDate', 'category', 'status'],
    },
    versions: {
        drafts: true,
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
                { label: 'News', value: 'news' },
                { label: 'Blog', value: 'blog' },
                { label: 'Case Study', value: 'case-study' },
                { label: 'Company', value: 'company' },
            ],
            defaultValue: 'blog',
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Excerpt',
        },
        {
            name: 'slug',
            type: 'text',
            index: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        }
                        return value;
                    }
                ]
            }
        }
    ],
}
