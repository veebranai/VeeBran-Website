// // import { CollectionConfig } from 'payload/types'

export const Users: any = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        // Email added by default due to auth: true
    ],
}
