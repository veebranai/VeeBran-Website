
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Metadata } from "next";
import Link from "next/link";
import { OptimizedImage } from "@/components/seo/OptimizedImage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "News & Insights | VeeBran",
    description: "Latest updates on AI, Marketing, and the VeeBran ecosystem.",
};

export default async function NewsPage() {
    const payload = await getPayloadHMR({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        limit: 12,
        sort: '-publishedDate',
    })

    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden">
            <ParticleBackground />
            <Navbar />

            <Section className="pt-32 pb-16">
                <Container className="text-center">
                    <Typography variant="h1" className="mb-6">Insights & News</Typography>
                    <Typography variant="lead" className="max-w-2xl mx-auto text-vb-text/80">
                        Cultivating knowledge in AI, Marketing, and Business Growth.
                    </Typography>
                </Container>
            </Section>

            <Section className="pb-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.docs.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                                <Typography variant="h3" className="text-white/50">Newsroom is germinating...</Typography>
                                <p className="text-vb-text/60 mt-2">Our editors are curating the latest AI-Marketing insights.</p>
                            </div>
                        ) : (
                            posts.docs.map((post) => (
                                <Link
                                    href={`/news/${post.slug || '#'}`}
                                    key={post.id}
                                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-1 block"
                                >
                                    <div className="h-48 bg-black/50 relative overflow-hidden">
                                        {post.heroImage && (
                                            <OptimizedImage
                                                image={post.heroImage as any}
                                                fill={true}
                                                className="group-hover:scale-105 transition-transform duration-500"
                                                alt={post.title}
                                            />
                                        )}
                                        {!post.heroImage && (
                                            <div className="absolute inset-0 flex items-center justify-center text-4xl">📰</div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-vb-neon/90 text-vb-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {post.publishedDate && (
                                            <div className="text-xs text-vb-text/60 mb-2">
                                                {new Date(post.publishedDate).toLocaleDateString()}
                                            </div>
                                        )}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-vb-neon transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-vb-text/70 text-sm line-clamp-3">
                                            {post.excerpt as string}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
