import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { ContactForm } from "@/components/organisms/ContactForm";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";
import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Contact | VeeBran",
    description: "Get in touch with VeeBran to start your transformation journey.",
};

export default function ContactPage() {
    return (
        <main className="relative min-h-screen bg-vb-dark overflow-x-hidden selection:bg-vb-neon/30">
            <ParticleBackground />
            <Navbar />

            {/* Hero Section */}
            <Section className="pt-32 pb-12 relative">
                <Container className="relative z-10 text-center">
                    <Typography variant="small" className="text-vb-neon uppercase tracking-widest mb-4 inline-block font-bold">
                        Connect With Us
                    </Typography>
                    <Typography variant="h1" className="mb-6">
                        Let&apos;s Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-vb-neon to-white">Future</span>
                    </Typography>
                    <Typography variant="lead" className="max-w-2xl mx-auto text-vb-text/80">
                        Whether you have a specific project in mind or just want to explore possibilities, we&apos;re here to listen.
                    </Typography>
                </Container>
            </Section>

            <Section className="pb-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-6 font-heading">Contact Information</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-vb-green/20 rounded-full flex items-center justify-center text-vb-green">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-vb-text/60 font-bold uppercase tracking-wider mb-1">Email</p>
                                            <a href="mailto:hello@veebran.com" className="text-lg text-white hover:text-vb-neon transition-colors">hello@veebran.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-vb-blue/20 rounded-full flex items-center justify-center text-vb-blue">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-vb-text/60 font-bold uppercase tracking-wider mb-1">Phone</p>
                                            <a href="tel:+1234567890" className="text-lg text-white hover:text-vb-neon transition-colors">+1 (555) 123-4567</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-vb-neon/20 rounded-full flex items-center justify-center text-vb-neon">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-vb-text/60 font-bold uppercase tracking-wider mb-1">HQ</p>
                                            <p className="text-lg text-white">
                                                123 Innovation Drive,<br />
                                                Silicon Valley, CA 94025
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-64 rounded-2xl overflow-hidden grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-white/10 relative group">
                                <Image
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=3000&auto=format&fit=crop"
                                    alt="Map Location"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/20 transition-all z-10">
                                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white border border-white/20 hover:bg-vb-green hover:border-transparent transition-all">
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
