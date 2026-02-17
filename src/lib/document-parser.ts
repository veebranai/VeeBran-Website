
import mammoth from 'mammoth';

// pdf-parse is loaded via require() at runtime to avoid Webpack bundling issues in Next.js.
// mammoth handles DOCX parsing.

export async function parseDocument(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
            // For server-side PDF parsing in Next.js, we need a robust approach. 
            // Many simple `pdf-parse` libs fail with Webpack/Next.js/Edge.
            // We will attempt to use `pdf-parse` if import works, otherwise handle error.
            // Since `pdf-parse` is strictly node, we might need to rely on the API route being nodejs (not edge).

            try {
                const result = await require('pdf-parse')(buffer);
                return result.text;
            } catch (e) {
                console.warn("Standard pdf-parse failed, trying alternative or throwing", e);
                throw new Error("PDF parsing failed. Please try converting to DOCX or text.");
            }

        } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
        ) {
            // Parse DOCX using mammoth (free)
            const result = await mammoth.extractRawText({ buffer });
            return result.value;

        } else {
            throw new Error('Unsupported file type. Please upload PDF or DOCX.');
        }
    } catch (error) {
        console.error('Document parsing error:', error);
        throw new Error('Failed to parse document. Please ensure it\'s a valid PDF or DOCX file.');
    }
}

// Extract key project details from raw text
export function extractProjectDetails(text: string) {
    // Simple regex-based extraction (can be enhanced with AI later)
    const patterns = {
        projectTitle: /(?:project|proposal|title)[:\s]+([^\n]+)/i,
        objectives: /(?:objectives|goals)[:\s]+([^\n]+)/i,
        timeline: /(?:timeline|duration|deadline)[:\s]+([^\n]+)/i,
        budget: /(?:budget|cost|investment)[:\s]+([^\n]+)/i,
        industry: /(?:industry|sector)[:\s]+([^\n]+)/i,
        clientName: /(?:client|prepared for)[:\s]+([^\n]+)/i,
    };

    const details: any = {};

    Object.entries(patterns).forEach(([key, regex]) => {
        const match = text.match(regex);
        if (match && match[1]) {
            details[key] = match[1].trim();
        }
    });

    // Fallback: Use first 1000 characters if no structured data found to give context
    if (!details.rawSummary) {
        details.rawSummary = text.substring(0, 2000);
    }

    return details;
}
