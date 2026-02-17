import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { OptimizedImage } from "@/components/seo/OptimizedImage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About VeeBran | Nature Meets Technology",
    description: "We are cultivating digital environments where your business can grow organically, supported by the invisible strength of AI.",
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden selection:bg-vb-neon/30">
            <ParticleBackground />
            <Navbar />

            {/* Hero Section */}
            <Section className="pt-32 pb-16 relative">
                <Container className="text-center relative z-10">
                    <Typography variant="small" className="text-vb-blue uppercase tracking-widest mb-4 inline-block font-bold">
                        Our Story
                    </Typography>
                    <Typography variant="h1" className="mb-8">
                        Where Nature Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-vb-green to-vb-neon">Technology</span>
                    </Typography>
                    <Typography variant="lead" className="max-w-3xl mx-auto text-vb-text/80">
                        We&apos;re not just building software; we&apos;re cultivating a new era of business intelligence.
                        Inspired by the efficiency of natural ecosystems, VeeBran AI helps your business grow with organic precision.
                    </Typography>
                </Container>
            </Section>

            {/* Vision Section */}
            <Section className="py-24 bg-white/5">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            {/* Visual Intelligence Placeholder */}
                            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-vb-green/20 to-vb-blue/20 flex items-center justify-center border border-white/5 group">
                                <OptimizedImage
                                    image={{ url: '', alt: 'VeeBran Neural Network', filename: 'veebran-neural.jpg' } as any}
                                    width={600} height={400}
                                    className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                    alt="VeeBran Neural Network optimizing business flow"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-6xl">🕸️</span>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-2">Visualizing the Neural Web of Business</p>
                        </div>
                        <div>
                            <Typography variant="h2" className="mb-6">Our Philosophy</Typography>
                            <Typography variant="p" className="mb-6 text-lg">
                                At VeeBran, we believe that true innovation mimics nature. Just as a forest ecosystem thrives through connection and adaptation, modern businesses must become living, breathing entities capable of real-time evolution.
                            </Typography>
                            <Typography variant="p" className="text-lg">
                                Our &quot;Visual Intelligence&quot; isn&apos;t just about pretty pictures—it&apos;s about creating interfaces that feel intuitive, organic, and alive.
                            </Typography>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
