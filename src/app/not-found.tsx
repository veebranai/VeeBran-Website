
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
            <h2 className="text-2xl mb-8">Page Not Found</h2>
            <p className="mb-8 text-gray-400">Could not find requested resource</p>
            <Link href="/" className="px-6 py-3 bg-brand-green text-white rounded-full hover:bg-brand-teal transition-colors">
                Return Home
            </Link>
        </div>
    );
}
