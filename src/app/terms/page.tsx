import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="bg-vb-dark min-h-screen selection:bg-vb-neon/30">
            <Navbar />
            <Section className="pt-32 pb-20">
                <Container>
                    <Typography variant="small" className="text-vb-neon uppercase tracking-widest mb-4 font-bold">Legal</Typography>
                    <Typography variant="h1" className="mb-8">Terms of Service</Typography>
                    <div className="prose prose-invert prose-lg max-w-none space-y-8 text-vb-text/80">
                        <p className="lead border-l-4 border-vb-neon pl-6 italic">
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>

                        <p>
                            Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the https://veebran.com website (the &quot;Service&quot;) operated by VeeBran Consulting (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                        </p>
                        <p>
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                        </p>
                        <p className="font-bold text-white">
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                        </p>

                        <hr className="border-white/10" />

                        <h3>1. Intellectual Property</h3>
                        <p>
                            The Service and its original content, features and functionality are and will remain the exclusive property of VeeBran Consulting and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of VeeBran Consulting.
                        </p>

                        <h3>2. Links To Other Web Sites</h3>
                        <p>
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by VeeBran Consulting.
                        </p>
                        <p>
                            VeeBran Consulting has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that VeeBran Consulting shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                        </p>
                        <p>
                            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                        </p>

                        <h3>3. Termination</h3>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                        <p>
                            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            In no event shall VeeBran Consulting, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                        </p>

                        <h3>5. Disclaimer</h3>
                        <p>
                            Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                        </p>
                        <p>
                            VeeBran Consulting its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                        </p>

                        <h3>6. Governing Law</h3>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of United States, without regard to its conflict of law provisions.
                        </p>
                        <p>
                            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                        </p>

                        <h3>7. Changes</h3>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                        <p>
                            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                        </p>

                        <h3>8. Contact Us</h3>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:hello@veebran.com" className="text-vb-neon hover:underline">hello@veebran.com</a>
                        </p>
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
