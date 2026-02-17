
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks: {
        authorized({ req, token }) {
            // Protect /admin routes (Payload handled separately? No, Payload uses its own auth usually, but if we wrap it...)
            // Protecting /dashboard and /settings
            if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/account')) {
                return !!token;
            }
            return true;
        },
    },
});

export const config = {
    matcher: ['/dashboard/:path*', '/account/:path*'],
};
