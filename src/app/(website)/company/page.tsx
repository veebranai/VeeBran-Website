import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { TeamProfiles } from "@/components/organisms/TeamProfiles";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { OptimizedImage } from "@/components/seo/OptimizedImage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Company | VeeBran",
    description: "Meet the visionaries behind VeeBran - driven by nature, powered by AI.",
};

import { JsonLd } from "@/components/seo/JsonLd";

export default function CompanyPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VeeBran',
        url: 'https://veebran.com',
        description: 'A collective of strategists, engineers, and designers united by a single mission: to harmonize human potential with artificial intelligence.',
        foundingDate: '2023',
        founders: [
            {
                '@type': 'Person',
                name: 'Sarah Chen'
            },
            {
                '@type': 'Person',
                name: 'Marcus Rodriguez'
            }
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            addressCountry: 'US'
        }
    };

    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden selection:bg-vb-neon/30">
            <ParticleBackground />
            <JsonLd data={jsonLd} />
            <Navbar />

            {/* Hero Section */}
            <Section className="pt-32 pb-16 relative">
                <Container className="text-center relative z-10">
                    <Typography variant="small" className="text-vb-blue uppercase tracking-widest mb-4 inline-block font-bold">
                        Who We Are
                    </Typography>
                    <Typography variant="h1" className="mb-8">
                        Architects of <span className="text-transparent bg-clip-text bg-gradient-to-r from-vb-green to-vb-neon">Intelligence</span>
                    </Typography>
                    <Typography variant="lead" className="max-w-3xl mx-auto text-vb-text/80">
                        We are a collective of strategists, engineers, and designers united by a single mission:
                        to harmonize human potential with artificial intelligence.
                    </Typography>
                </Container>
            </Section>

            {/* Team Section */}
            <Section className="bg-black/20 min-h-[60vh]">
                <Container>
                    <div className="text-center mb-16">
                        <Typography variant="h2" className="mb-4">Our Leadership</Typography>
                        <div className="w-20 h-1 bg-vb-neon mx-auto rounded-full" />
                    </div>
                    <TeamProfiles />
                </Container>
            </Section>

            {/* Mission/Values Section */}
            <Section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <Typography variant="h2" className="mb-6">Our Philosophy</Typography>
                            <Typography variant="p" className="mb-6 text-lg">
                                At VeeBran, we believe that true innovation mimics nature. Just as a forest ecosystem thrives through connection and adaptation, modern businesses must become living, breathing entities capable of real-time evolution.
                            </Typography>
                            <Typography variant="p" className="text-lg">
                                We don&apos;t just build software; we cultivate digital environments where your business can grow organically, supported by the invisible strength of AI.
                            </Typography>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-vb-green/20 to-vb-blue/20 flex items-center justify-center border border-white/5">
                            <OptimizedImage
                                image="/assets/nature-tech-concept.jpg"
                                alt="Nature meets Technology"
                                fill
                                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
