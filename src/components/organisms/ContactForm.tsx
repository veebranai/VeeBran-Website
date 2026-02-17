"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // FREE alternative: Formspree (using a placeholder ID, user needs to replace)
            // For demo purposes, we'll simulate a success response if no ID is provided

            const formId = "YOUR_FORM_ID"; // User would replace this

            let response;
            if (formId === "YOUR_FORM_ID") {
                // Simulation
                await new Promise(resolve => setTimeout(resolve, 1500));
                response = { ok: true };
            } else {
                response = await fetch(`https://formspree.io/f/${formId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Reset status after 3 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-vb-text/70">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-vb-neon focus:border-transparent outline-none transition-all text-white placeholder-white/30"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-vb-text/70">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-vb-neon focus:border-transparent outline-none transition-all text-white placeholder-white/30"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-vb-text/70">Message</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-vb-neon focus:border-transparent outline-none transition-all text-white placeholder-white/30 resize-none"
                        placeholder="Tell us about your project..."
                        required
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors",
                        status === 'success' ? "bg-green-600 text-white" :
                            status === 'error' ? "bg-red-600 text-white" :
                                "bg-vb-green text-white hover:bg-green-600"
                    )}
                >
                    {status === 'submitting' ? (
                        <span className="animate-pulse">Sending...</span>
                    ) : status === 'success' ? (
                        <>Message Sent <CheckCircle size={20} /></>
                    ) : status === 'error' ? (
                        <>Failed. Try Again <AlertCircle size={20} /></>
                    ) : (
                        <>Send Message <Send size={20} /></>
                    )}
                </motion.button>

                {status === 'success' && (
                    <p className="text-center text-green-400 text-sm mt-2">
                        We&apos;ll get back to you within 24 hours.
                    </p>
                )}
            </form>
        </div>
    );
}
