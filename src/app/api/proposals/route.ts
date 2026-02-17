
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { SecurityMiddleware } from '@/lib/database/middleware';
import { SecurityLogger, SecurityEvent } from '@/lib/security/logger';
import { z } from 'zod';

// ===== SECURITY: Input validation schema =====
const createProposalSchema = z.object({
    title: z.string().min(3).max(200),
    clientName: z.string().min(2).max(100),
    projectName: z.string().min(3).max(200),
    region: z.enum(['north-america', 'europe', 'asia', 'africa', 'latin-america', 'australia']),
    documentUrl: z.string().url().optional(),
    content: z.string().max(10000)
});

// ===== SECURITY: Rate limiting configuration =====
const RATE_LIMIT = {
    maxRequests: 10,
    windowSeconds: 60
};

export async function POST(request: NextRequest) {
    try {
        // ===== SECURITY: Rate limiting =====
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const rateLimit = await SecurityMiddleware.checkRateLimit(
            ip,
            '/api/proposals',
            RATE_LIMIT.maxRequests,
            RATE_LIMIT.windowSeconds
        );

        if (!rateLimit.allowed) {
            await SecurityLogger.log(SecurityEvent.RATE_LIMIT_HIT, null, { ip, endpoint: '/api/proposals' });
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        // ===== SECURITY: Authentication =====
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = (session.user as any).id;

        // ===== SECURITY: Input validation =====
        const body = await request.json();
        const validatedData = createProposalSchema.parse(body);

        // ===== SECURITY: Input sanitization =====
        const sanitizedData = SecurityMiddleware.sanitizeInput(validatedData);

        // ===== SECURITY: Create proposal with ownership =====
        const proposal = await prisma.proposal.create({
            data: {
                ...sanitizedData,
                userId: userId,
                status: 'DRAFT',
                quoteAmount: 0, // Will be calculated by AI engine
                currency: getCurrencyByRegion(sanitizedData.region)
            }
        });

        // ===== SECURITY: Audit log =====
        await SecurityLogger.log(SecurityEvent.PROPOSAL_CREATED, userId, {
            proposalId: proposal.id,
            region: sanitizedData.region,
            ip
        });

        return NextResponse.json({
            success: true,
            proposal,
            rateLimit: {
                remaining: rateLimit.remaining,
                resetIn: RATE_LIMIT.windowSeconds
            }
        });

    } catch (error) {
        // ===== SECURITY: Error handling without leaking info =====
        console.error('Proposal creation error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid input', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper: Get currency by region
function getCurrencyByRegion(region: string): string {
    const currencies: Record<string, string> = {
        'north-america': 'USD',
        'europe': 'EUR',
        'asia': 'INR',
        'africa': 'ZAR',
        'latin-america': 'BRL',
        'australia': 'AUD'
    };

    return currencies[region] || 'USD';
}
