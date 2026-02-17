
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Key, ShieldCheck } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Access Denied. Invalid credentials.');
                setIsLoading(false);
            } else {
                router.push('/dashboard');
                router.refresh(); // Ensure strict middleware validation
            }
        } catch (err) {
            setError('System Error. Connection failed.');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Identity</label>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="agent@veebran.com"
                        required
                    />
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Passcode</label>
                <div className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="••••••••"
                        required
                    />
                    <Key className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        <ShieldCheck className="w-4 h-4" />
                        Initialize Session
                    </>
                )}
            </button>
        </form>
    );
}
