
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SecurityMiddleware } from '@/lib/database/middleware';
import { prisma } from '@/lib/database';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { RateLimiter } from '@/lib/security/rate-limiter';

// Validation Schema
const ProposalSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    value: z.number().positive(),
    clientEmail: z.string().email(),
});

export async function POST(req: Request) {
    try {
        // 1. Authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // 2. Rate Limiting
        const userId = session.user.id;
        const { allowed } = await RateLimiter.checkUser(userId, 'create_proposal', 10, 60);
        if (!allowed) {
            return new NextResponse('Too Many Requests', { status: 429 });
        }

        // 3. Validation
        const body = await req.json();
        const result = ProposalSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(result.error, { status: 400 });
        }
        const data = result.data;

        // 4. Authorized Access (RBAC/Policy)
        // Example: Only 'admin' or 'advisor' can create proposals
        // if (session.user.role !== 'admin') ...

        // 5. Database Transaction (Secure Create)
        // Using SecurityMiddleware to ensure correct ownership is handled implicitly or checked
        const proposal = await prisma.proposal.create({
            data: {
                title: SecurityMiddleware.sanitizeInput(data.title),
                content: SecurityMiddleware.sanitizeInput(data.content), // Basic sanitization
                quoteAmount: data.value,
                clientName: data.clientEmail, // Using email as name for now
                projectName: 'Untitled Project', // Default
                region: 'global', // Default
                currency: 'USD', // Default
                processedBy: 'Manual', // Default
                processingTime: 0, // Default
                userId: userId,
                status: 'DRAFT',
            },
        });

        return NextResponse.json(proposal);

    } catch (error: any) {
        console.error('Proposal Creation Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    // Secure Data Access: Only fetch user's own proposals
    const proposals = await prisma.proposal.findMany({
        where: { userId: session.user.id }
    });

    return NextResponse.json(proposals);
}
