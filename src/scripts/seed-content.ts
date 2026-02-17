
import { getPayload } from 'payload'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load env vars BEFORE importing config
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEED_POSTS = [
    {
        title: "VeeBran Launches Visual Intelligence Engine",
        slug: "visual-intelligence-launch",
        category: "news", // "Product" wasn't a valid option in schema options? Schema has: News, Blog, Case Study, Company.
        excerpt: "A new era of business visualization has arrived. See how our AI transforms data into organic growth strategies.",
        content: {
            root: {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                text: "VeeBran is proud to announce the launch of our Visual Intelligence Engine. By combining advanced generative AI with deep business strategy, we are enabling companies to see their future before they build it.",
                                version: 1
                            }
                        ],
                        version: 1,
                        direction: "ltr",
                        format: "",
                        indent: 0
                    }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1
            }
        },
        publishedDate: new Date().toISOString(),
    },
    {
        title: "Global Expansion: New Nodes in Berlin & Bangalore",
        slug: "global-expansion-nodes",
        category: "company",
        excerpt: "Our mycelial network is growing. We are establishing new innovation hubs to serve the European and Asian markets.",
        content: {
            root: {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                text: "As part of our mission to dominate global SEO and strategy, VeeBran has activated new physical and digital nodes in Berlin and Bangalore. These hubs will focus on GDPR-compliant AI and localized market strategies.",
                                version: 1
                            }
                        ],
                        version: 1,
                        direction: "ltr",
                        format: "",
                        indent: 0
                    }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1
            }
        },
        publishedDate: new Date().toISOString(),
    }
];

const SEED_CAREERS = [
    {
        title: "Senior AI Growth Engineer",
        slug: "senior-ai-growth-engineer",
        department: "Engineering",
        location: "Remote",
        type: "full-time",
        excerpt: "Build the engines that power organic business growth.",
        description: {
            root: {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                text: "We are looking for a visionary engineer to lead our core growth engine. You will work at the intersection of LLMs, data visualization, and business strategy.",
                                version: 1
                            }
                        ],
                        version: 1,
                        direction: "ltr",
                        format: "",
                        indent: 0
                    }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1
            }
        },
        applicationLink: "mailto:careers@veebran.com"
    },
    {
        title: "Visual Intelligence Designer",
        slug: "visual-intelligence-designer",
        department: "Design",
        location: "Berlin",
        type: "contract",
        excerpt: "Shape the aesthetic of the future.",
        description: {
            root: {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                text: "Your role is to translate complex data into beautiful, organic visualizations. Mastery of both UI design and generative art tools is required.",
                                version: 1
                            }
                        ],
                        version: 1,
                        direction: "ltr",
                        format: "",
                        indent: 0
                    }
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1
            }
        },
        applicationLink: "mailto:careers@veebran.com"
    }
];

async function seed() {
    console.log('🌱 Seeding Content...')

    // Dynamic import to ensure env vars are loaded
    const { default: config } = await import('../payload.config.ts');

    const payload = await getPayload({ config })

    // Seed Posts
    for (const post of SEED_POSTS) {
        try {
            await payload.create({
                collection: 'posts' as any,
                data: post,
            })
            console.log(`✅ Created Post: ${post.title}`)
        } catch (error: any) {
            // Check if error is due to unique constraint (slug)
            if (error?.message?.includes('unique') || error?.data?.[0]?.message?.includes('unique')) {
                console.log(`⏭️  Skipped Post: ${post.title} (Exists)`)
            } else {
                console.error(`❌ Failed Post: ${post.title}`, error?.data || error)
            }
        }
    }

    // Seed Careers
    for (const job of SEED_CAREERS) {
        try {
            await payload.create({
                collection: 'careers' as any,
                data: job,
            })
            console.log(`✅ Created Job: ${job.title}`)
        } catch (error: any) {
            if (error?.message?.includes('unique') || error?.data?.[0]?.message?.includes('unique')) {
                console.log(`⏭️  Skipped Job: ${job.title} (Exists)`)
            } else {
                console.error(`❌ Failed Job: ${job.title}`, error?.data || error)
            }
        }
    }

    console.log('🌳 Seeding Complete.')
    process.exit(0)
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
