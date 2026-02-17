
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { TeamProfiles } from "@/components/organisms/TeamProfiles"; // Reuse existing component if it fetches from Payload
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team | VeeBran",
    description: "Meet the architects behind VeeBran AI.",
};

export default function TeamPage() {
    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden selection:bg-vb-neon/30">
            <ParticleBackground />
            <Navbar />

            <Section className="pt-32 pb-16">
                <Container className="text-center">
                    <Typography variant="h1" className="mb-6">The Architects</Typography>
                    <Typography variant="lead" className="max-w-2xl mx-auto text-vb-text/80">
                        A global team of engineers, designers, and strategists building the future of intelligent proposals.
                    </Typography>
                </Container>
            </Section>

            <Section className="pb-24">
                <Container>
                    <TeamProfiles />
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
