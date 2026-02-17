
import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users.ts'
import { Projects } from './collections/Projects.ts'
import { Team } from './collections/Team.ts'
import { Services } from './collections/Services.ts'
import { Pages } from './collections/Pages.ts'
import { CaseStudies } from './collections/CaseStudies.ts'
import { FAQs } from './collections/FAQs.ts'
import { Media } from './collections/Media.ts'
import { Posts } from './collections/Posts.ts'
import { Careers } from './collections/Careers.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Users,
        Pages,
        Services,
        Projects,
        CaseStudies,
        Team,
        FAQs,
        Media,
        Posts,
        Careers,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'veebran-dev-secret-change-me-in-production',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
        schemaName: 'payload',
    }),
    sharp,
})
