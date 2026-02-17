
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Careers | VeeBran",
    description: "Join the VeeBran ecosystem. Help us cultivate the future of AI.",
};

export default async function CareersPage() {
    const payload = await getPayloadHMR({ config: configPromise })
    const careers = await payload.find({
        collection: 'careers',
        limit: 100,
    })

    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden">
            <ParticleBackground />
            <Navbar />

            <Section className="pt-32 pb-16">
                <Container className="text-center">
                    <Typography variant="h1" className="mb-6">Join the Ecosystem</Typography>
                    <Typography variant="lead" className="max-w-2xl mx-auto text-vb-text/80">
                        We are looking for organic thinkers and technical masters to help us grow.
                    </Typography>
                </Container>
            </Section>

            <Section className="pb-24">
                <Container>
                    <div className="grid gap-6">
                        {careers.docs.length === 0 ? (
                            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                                <Typography variant="h3" className="text-white/50">No open positions currently.</Typography>
                                <p className="text-vb-text/60 mt-2">Check back soon or sprout a conversation at careers@veebran.com</p>
                            </div>
                        ) : (
                            careers.docs.map((job) => (
                                <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                                        <div className="flex gap-4 text-sm text-vb-text/60">
                                            <span>{job.department}</span>
                                            <span>•</span>
                                            <span>{job.location}</span>
                                            <span>•</span>
                                            <span className="capitalize">{job.type}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={job.applicationLink || `mailto:careers@veebran.com?subject=Application for ${job.title}`}
                                        className="px-6 py-2 bg-vb-neon text-vb-dark font-bold rounded-lg hover:bg-vb-green transition-colors"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
