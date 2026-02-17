"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { ArrowRight, BrainCircuit, Sparkles, RefreshCw } from 'lucide-react';
import dynamic from 'next/dynamic';

const AiCanvas = dynamic(() => import('@/components/canvas/AiCanvas'), {
    ssr: false,
    loading: () => <div className="text-white/20 text-sm flex items-center justify-center w-full h-full">[Initializing 3D Engine...]</div>
});

interface AiStrategyEngineProps {
    onComplete?: (result: any) => void;
}

export function AiStrategyEngine({ onComplete }: AiStrategyEngineProps) {
    // ... (keep existing state)
    const [step, setStep] = useState<number>(0);
    const [industry, setIndustry] = useState<string>('');
    const [goal, setGoal] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);

    const industries = ['Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Tech'];
    const goals = ['Efficiency', 'Growth', 'Innovation', 'Sustainability'];

    const handleProcess = async () => {
        setStep(2);
        setIsProcessing(true);

        try {
            // Import dynamically to ensure it's treated as a server action call from client component
            const { generateStrategy } = await import('@/actions/generateStrategy');
            const aiResult = await generateStrategy(industry, goal);

            setResult(aiResult);
            setStep(3);
        } catch (error) {
            console.error("AI Generation failed", error);
            // Fallback
            setResult({
                title: "Error Generating Strategy",
                score: 0,
                insight: "The neural network encountered an unexpected anomaly. Please try again.",
                recommendation: "Retry"
            });
            setStep(3);
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setStep(0);
        setIndustry('');
        setGoal('');
        setResult(null);
    };

    return (
        <div className="w-full max-w-5xl mx-auto min-h-[600px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">

            {/* Visualizer Panel (Left/Top) */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gradient-to-br from-black to-vb-dark relative border-b md:border-b-0 md:border-r border-white/10">
                <div className="absolute inset-0 z-0">
                    <AiCanvas state={isProcessing ? 'processing' : (step === 3 ? 'complete' : 'idle')} />
                </div>

                {/* Status Overlay */}
                <div className="absolute bottom-6 left-6 z-10">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-vb-neon animate-pulse' : 'bg-white/50'}`} />
                        <span className="text-xs uppercase tracking-widest text-white/70">
                            {isProcessing ? 'ANALYZING DATA POINTS...' : (step === 3 ? 'ANALYSIS COMPLETE' : 'SYSTEM READY')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Interaction Panel (Right/Bottom) */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">

                    {/* Step 0: Industry Selection */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <span className="text-vb-neon text-sm font-bold tracking-wider">STEP 01</span>
                                <Typography variant="h3" className="mt-2">Select Your Industry</Typography>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {industries.map((ind) => (
                                    <button
                                        key={ind}
                                        onClick={() => setIndustry(ind)}
                                        className={`p-3 text-left rounded-lg text-sm transition-all border ${industry === ind
                                            ? 'bg-vb-neon/10 border-vb-neon text-white shadow-[0_0_15px_rgba(0,217,160,0.3)]'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                            <div className="pt-4">
                                <Button
                                    onClick={() => setStep(1)}
                                    disabled={!industry}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Next <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 1: Goal Selection */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <span className="text-vb-neon text-sm font-bold tracking-wider">STEP 02</span>
                                <Typography variant="h3" className="mt-2">Define Primary Goal</Typography>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {goals.map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGoal(g)}
                                        className={`p-3 text-left rounded-lg text-sm transition-all border ${goal === g
                                            ? 'bg-vb-neon/10 border-vb-neon text-white shadow-[0_0_15px_rgba(0,217,160,0.3)]'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                                <Button
                                    onClick={handleProcess}
                                    disabled={!goal}
                                    variant="primary"
                                    className="flex-1"
                                >
                                    Generate Strategy <BrainCircuit className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Processing */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center h-full space-y-4"
                        >
                            <div className="w-16 h-16 border-4 border-vb-green border-t-transparent rounded-full animate-spin" />
                            <Typography variant="h4">Synthesizing Data Models...</Typography>
                            <p className="text-white/50 text-sm">Accessing Vector Database...</p>
                        </motion.div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && result && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring' }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-vb-green text-xs font-bold tracking-wider uppercase border border-vb-green/30 px-2 py-1 rounded bg-vb-green/10">
                                        Strategic Insight
                                    </span>
                                    <Typography variant="h4" className="mt-3 leading-tight">{result.title}</Typography>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-vb-neon">{result.score}%</div>
                                    <div className="text-[10px] text-white/50 uppercase">Viability</div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-sm leading-relaxed text-white/90">
                                    {result.insight}
                                </p>
                            </div>

                            <div>
                                <div className="text-xs text-white/50 uppercase tracking-widest mb-2">Recommendation</div>
                                <div className="flex items-center gap-3 text-vb-blue font-semibold">
                                    <Sparkles className="w-5 h-5" />
                                    {result.recommendation}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                                <Button
                                    onClick={() => onComplete?.(result)}
                                    variant="primary"
                                    className="w-full bg-gradient-to-r from-vb-neon to-vb-green text-vb-dark font-bold hover:shadow-[0_0_20px_rgba(0,217,160,0.4)] transition-all"
                                >
                                    Build Proposal for {industry} <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button onClick={reset} variant="ghost" className="w-full text-white/40 hover:text-white text-xs">
                                    <RefreshCw className="w-3 h-3 mr-2" /> Run Another Simulation
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
