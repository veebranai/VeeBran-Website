
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function SignInPage() {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    VeeBran Secure
                </h1>
                <p className="text-gray-400 text-sm">
                    Enterprise Intelligence Access
                </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <LoginForm />
            </div>

            <p className="text-center text-xs text-gray-500">
                By accessing this system, you agree to the{' '}
                <Link href="/terms" className="text-emerald-500 hover:text-emerald-400 underline">
                    Security Protocols
                </Link>
            </p>
        </div>
    );
}
