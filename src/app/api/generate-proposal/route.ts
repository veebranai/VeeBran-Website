
import { NextRequest, NextResponse } from 'next/server';
import { parseDocument, extractProjectDetails } from '@/lib/document-parser';
import { VeeBranEngine } from '@/lib/veebran-engine';
import { calculateQuote, detectRegionFromIP } from '@/lib/pricing-engine';
import { createPDF } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
    try {
        // Parse multipart form data
        const formData = await request.formData();
        const file = formData.get('document') as File;
        const manualRegion = formData.get('region') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No document uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload PDF or DOCX.' },
                { status: 400 }
            );
        }

        // Parse document
        let rawText = '';
        try {
            rawText = await parseDocument(file);
        } catch (parseError) {
            console.error("Parsing failed:", parseError);
            return NextResponse.json(
                { error: 'Failed to read document text. Please ensure the file is not corrupted.' },
                { status: 400 }
            );
        }

        const projectDetails = extractProjectDetails(rawText);

        // Determine region (manual selection overrides auto-detection)
        const region = manualRegion || await detectRegionFromIP();

        // Generate AI proposal using VeeBran Engine
        const proposal = await VeeBranEngine.generateProposal(
            projectDetails,
            region,
            projectDetails.industry || 'General Business'
        );

        // Calculate quote
        const quote = calculateQuote(
            proposal.estimatedTotalHours,
            region,
            proposal.complexity
        );

        // Generate PDF proposal
        const pdfBuffer = await createPDF({
            proposal,
            quote,
            clientName: projectDetails.clientName || 'Prospective Client',
            projectName: projectDetails.projectTitle || 'AI Implementation Project',
            region
        });

        // Return PDF as response
        return new NextResponse(new Uint8Array(pdfBuffer), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="VeeBran_Proposal_${Date.now()}.pdf"`,
            },
        });

    } catch (error: any) {
        console.error('Proposal generation error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate proposal',
                details: error.message
            },
            { status: 500 }
        );
    }
}
