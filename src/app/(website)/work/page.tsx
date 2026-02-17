import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ProjectFilters } from "@/components/organisms/ProjectFilters";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work | VeeBran",
    description: "See how we're transforming industries with AI and nature-inspired innovation.",
};

export default function WorkPage() {
    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden selection:bg-vb-neon/30">
            <ParticleBackground />
            <Navbar />

            {/* Hero Section */}
            <Section className="pt-32 pb-16 relative">
                <Container className="text-center relative z-10">
                    <Typography variant="small" className="text-vb-neon uppercase tracking-widest mb-4 inline-block font-bold">
                        Our Portfolio
                    </Typography>
                    <Typography variant="h1" className="mb-8">
                        Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-vb-neon to-vb-green">Performance</span>
                    </Typography>
                    <Typography variant="lead" className="max-w-3xl mx-auto text-vb-text/80">
                        Real-world challenges solved with next-generation intelligence. Explore our impact across industries.
                    </Typography>
                </Container>
            </Section>

            {/* Case Study Highlight (Before/After) */}
            <Section className="bg-black/20 pb-24">
                <Container>
                    <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 mb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Typography variant="h3" className="mb-4 text-vb-neon">Efficiency Redefined</Typography>
                                <Typography variant="h2" className="mb-6 text-2xl md:text-3xl">Supply Chain Optimization</Typography>
                                <p className="text-vb-text/80 text-lg mb-8 leading-relaxed">
                                    For a global logistics partner, we implemented our &quot;VeeBran AI&quot; routing algorithm. By mimicking the decentralized decision-making of bee colonies, we reduced idle time and fuel consumption drastically.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-4xl font-bold text-white mb-2 font-heading">40%</div>
                                        <div className="text-sm text-vb-text/60 uppercase tracking-widest">Carbon Reduction</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-white mb-2 font-heading">2.5x</div>
                                        <div className="text-sm text-vb-text/60 uppercase tracking-widest">Speed Increase</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* 
                            Note: In a real scenario, these would be actual before/after screenshots.
                            For this demo, we'll use placeholder gradients to represent "Chaos vs Order".
                        */}
                                <BeforeAfterSlider
                                    beforeImage="https://images.unsplash.com/photo-1542601906990-24d4c16419d9?q=80&w=1000&auto=format&fit=crop" // Chaos/Traffic
                                    afterImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" // Order/Data
                                    beforeLabel="Legacy Routing"
                                    afterLabel="VeeBran AI"
                                    className="shadow-2xl shadow-vb-neon/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filterable Grid */}
                    <div className="text-center mb-12">
                        <Typography variant="h2">Recent Deployments</Typography>
                    </div>
                    <ProjectFilters />

                </Container>
            </Section>

            {/* CTA */}
            <Section className="py-24 text-center">
                <Container>
                    <Typography variant="h2" className="mb-8">Have a Challenge for Us?</Typography>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-vb-dark bg-white rounded-full hover:bg-vb-neon hover:text-black transition-all shadow-lg hover:scale-105"
                    >
                        Start a Project
                    </a>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
