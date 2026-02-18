'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/particles/VeeBranParticleSystem";

import { Leaf, Upload, Cpu, Download, Sparkles, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { AiStrategyEngine } from "@/components/organisms/AiStrategyEngine";
import { RegionContent } from '@/lib/seo-content';

type Props = {
    initialRegion?: RegionContent;
};

export function AiPageClient({ initialRegion }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [region, setRegion] = useState(initialRegion?.id || '');
    const [strategyContext, setStrategyContext] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formSectionRef = useRef<HTMLDivElement>(null);

    // Sync region if prop changes (e.g. navigation)
    useEffect(() => {
        if (initialRegion) {
            setRegion(initialRegion.id);
        }
    }, [initialRegion]);

    const handleStrategyComplete = (result: any) => {
        setStrategyContext(result);
        if (formSectionRef.current) {
            formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
                setError('Please upload a PDF or DOCX file');
                return;
            }
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size exceeds 10MB limit');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsProcessing(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('document', file);
        if (region) formData.append('region', region);

        try {
            const response = await fetch('/api/generate-proposal', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to generate proposal');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `VeeBran_Proposal_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

        } catch (err: any) {
            setError(err.message || 'An error occurred while generating proposal');
        } finally {
            setIsProcessing(false);
        }
    };

    // Use customized title/claims if initialRegion is provided
    const heroTitle = initialRegion?.title.split(':')[0] || "Stop Losing Bids to Faster Competitors.";
    const heroDesc = initialRegion?.description || "Your clients demand speed and precision. Manual proposals are costing you deals. VeeBran Intelligence automates the strategy, so you can close the sale.";

    return (
        <main className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-neon/30">
            <ParticleBackground />
            <Navbar />

            <section className="pt-32 pb-16 px-6 md:px-12 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center bg-brand-green/10 text-brand-green px-4 py-2 rounded-full border border-brand-green/20 mb-8 backdrop-blur-md shadow-lg shadow-brand-green/5">
                            <Leaf className="w-4 h-4 mr-2" />
                            <span className="text-sm font-semibold tracking-wide uppercase">
                                {initialRegion ? `Optimized for ${initialRegion.currency} Markets` : "Powered by VeeBran Intelligence"}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent mb-6 tracking-tight">
                            {initialRegion ? initialRegion.title.replace('VeeBran AI: ', '') : heroTitle}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {heroDesc.replace('Verdant Intelligence', 'VeeBran Intelligence')}
                        </p>
                    </motion.div>

                    {/* Interactive Strategy Engine */}
                    <div className="mb-24 relative z-20">
                        <AiStrategyEngine onComplete={handleStrategyComplete} />
                    </div>

                    {/* Region Specific Proof (if available) */}
                    {initialRegion && (
                        <div className="mb-16 bg-brand-dark/50 border border-brand-green/30 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-brand-teal mb-2">Regional Success Story</h3>
                                    <h4 className="text-lg text-white font-semibold mb-2">{initialRegion.localProof.title}</h4>
                                    <p className="text-gray-400 mb-4">{initialRegion.localProof.desc}</p>
                                    <div className="bg-brand-green/5 p-4 rounded-xl border border-brand-green/10">
                                        <p className="italic text-gray-300 mb-2">&quot;{initialRegion.localProof.testimonial.quote}&quot;</p>
                                        <p className="text-sm text-brand-teal font-bold">— {initialRegion.localProof.testimonial.author}</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    {initialRegion.keyClaims.map((claim, i) => (
                                        <div key={i} className="flex items-center text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                                            <span>{claim}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* How It Works */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { step: 1, title: 'Plant the Seed', desc: 'Share your project requirements via PDF or DOCX', icon: <Upload className="w-8 h-8 text-brand-green" /> },
                            { step: 2, title: 'VeeBran Analysis', desc: 'Our engine analyzes the scope and nurtures the strategy', icon: <Cpu className="w-8 h-8 text-brand-green" /> },
                            { step: 3, title: 'Harvest Success', desc: 'Download a professional proposal and growth roadmap', icon: <Download className="w-8 h-8 text-brand-green" /> }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-brand-dark/40 rounded-2xl p-8 border border-brand-green/20 text-center backdrop-blur-sm hover:border-brand-green/50 transition-all hover:scale-[1.02]"
                            >
                                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <div className="text-3xl font-bold text-brand-teal mb-2">{item.step}</div>
                                <h3 className="text-xl font-bold mb-3 text-gray-100">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Upload Section */}
                    <motion.div
                        ref={formSectionRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-brand-dark/80 to-brand-dark/95 rounded-3xl border border-brand-green/30 p-8 md:p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-teal to-brand-blue" />
                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-3xl font-bold mb-4 text-white">
                                {strategyContext
                                    ? `Execute Your ${strategyContext.title.split('Strategy')[0]} Strategy`
                                    : "Turn Ambiguity into Actionable Revenue"}
                            </h2>
                            <p className="text-gray-400">
                                {strategyContext
                                    ? `Based on your goal, let's build a proposal that targets ${strategyContext.recommendation}.`
                                    : "Don't just send a quote. Send a roadmap that proves you understand their problem."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {/* Region Selector */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Select Your Market Ecosystem
                                </label>
                                <div className="relative">
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full bg-brand-dark/50 border border-brand-green/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-teal focus:border-transparent appearance-none transition-all"
                                    >
                                        <option value="">Auto-detect from IP</option>
                                        <option value="india">India</option>
                                        <option value="asia">Asia (Other)</option>
                                        <option value="north-america">North America</option>
                                        <option value="europe">Europe</option>
                                        <option value="south-america">South America</option>
                                        <option value="africa">Africa</option>
                                        <option value="oceania">Oceania</option>
                                        <option value="antarctica">Antarctica</option>
                                        <option value="global">Global Marketplace</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-teal">
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div
                                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group ${file
                                    ? 'border-brand-teal bg-brand-teal/5'
                                    : 'border-brand-green/30 hover:border-brand-green/60 hover:bg-brand-green/5'
                                    }`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                {file ? (
                                    <div className="flex items-center justify-center space-x-4">
                                        <Sparkles className="w-12 h-12 text-brand-teal" />
                                        <div className="text-left">
                                            <div className="font-medium text-white text-lg">{file.name}</div>
                                            <div className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 mx-auto mb-6 bg-brand-dark/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Upload className="w-10 h-10 text-brand-green" />
                                        </div>
                                        <p className="text-gray-300 mb-2 text-lg">
                                            <span className="font-bold text-white">Click to plant scope</span> or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PDF or DOCX (max. 10MB)
                                        </p>
                                    </>
                                )}
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center space-x-2 text-brand-teal bg-brand-teal/10 p-4 rounded-xl border border-brand-teal/20">
                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                        <span>Proposal ripened successfully! Check your downloads.</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button type="submit" disabled={!file || isProcessing} className={`w-full bg-gradient-to-r from-brand-green to-brand-teal text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg ${!file || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-brand-teal/30 hover:scale-[1.02]'}`}>
                                {isProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        VeeBran is cultivating your proposal...
                                    </span>
                                ) : ('Cultivate My Proposal & Quote')}
                            </button>
                        </form>
                        <div className="mt-8 pt-8 border-t border-brand-green/20 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-teal mr-1.5" /><span>Eco-System Logic</span></div>
                                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-teal mr-1.5" /><span>Regional Market Adaptation</span></div>
                                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-brand-teal mr-1.5" /><span>VeeBran Intelligence Output</span></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Value Proposition */}
                    <div className="mt-24 text-center">
                        <h2 className="text-4xl font-bold mb-12 text-white">Why VeeBran Intelligence?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                { title: 'Organic Growth', desc: 'Proposals that consider the full lifecycle of your project, from seed to scale.', icon: '🌱' },
                                { title: 'Market Ecosystems', desc: 'Accurate quotes tailored to the economic soil of your specific continent.', icon: '🌍' },
                                { title: 'VeeBran Quality', desc: 'AI-cultivated strategy that maintains a sophisticated, premium human tone.', icon: '👔' }
                            ].map((item, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }} className="p-8 bg-brand-dark/40 rounded-2xl border border-brand-green/20 hover:bg-brand-dark/60 transition-colors">
                                    <div className="text-5xl mb-6">{item.icon}</div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
