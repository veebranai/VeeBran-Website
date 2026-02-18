
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProposalData } from './veebran-engine';

interface PDFGeneratorParams {
    proposal: ProposalData;
    quote: {
        baseRate: number;
        totalHours: number;
        subtotal: number;
        markup: number;
        total: number;
        currency: string;
    };
    clientName: string;
    projectName: string;
    region: string;
}

export async function createPDF(data: PDFGeneratorParams): Promise<Buffer> {
    const { proposal, quote, clientName, projectName, region } = data;
    const doc = new jsPDF();

    // Brand Colors
    const COLORS = {
        dark: [10, 15, 13] as [number, number, number],    // #0A0F0D
        teal: [0, 217, 160] as [number, number, number],   // #00D9A0
        green: [46, 125, 50] as [number, number, number],  // #2E7D32
        blue: [21, 101, 192] as [number, number, number],  // #1565C0
        text: [60, 60, 60] as [number, number, number],
        lightTeal: [0, 217, 160, 0.1] as [number, number, number, number]
    };

    const pageWidth = 210;
    const pageHeight = 297;

    // Helper for background pattern
    const addBackgroundPattern = (opacity = 0.05) => {
        doc.setDrawColor(COLORS.teal[0], COLORS.teal[1], COLORS.teal[2]);
        doc.setLineWidth(0.1);
        for (let i = 0; i < pageWidth; i += 10) {
            doc.line(i, 0, i, pageHeight);
        }
        for (let i = 0; i < pageHeight; i += 10) {
            doc.line(0, i, pageWidth, i);
        }
    };

    // Page 1: Cover Page
    doc.setFillColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Abstract background elements for cover
    doc.setDrawColor(COLORS.teal[0], COLORS.teal[1], COLORS.teal[2]);
    doc.setLineWidth(0.5);
    doc.circle(210, 0, 100, 'S');
    doc.circle(0, 297, 80, 'S');

    // VeeBran Logo/Title
    doc.setTextColor(COLORS.teal[0], COLORS.teal[1], COLORS.teal[2]);
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.text('VeeBran', 105, 80, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("WORLD'S FIRST INTELLIGENT PROPOSAL ENGINE", 105, 95, { align: 'center', charSpace: 1 });

    doc.setDrawColor(COLORS.teal[0], COLORS.teal[1], COLORS.teal[2]);
    doc.line(80, 105, 130, 105);

    doc.setFontSize(24);
    doc.text('PROJECT PROPOSAL', 105, 130, { align: 'center' });

    // ... (rest of cover)

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        // Add watermark line to footers too
        doc.setDrawColor(COLORS.teal[0], COLORS.teal[1], COLORS.teal[2]);
        doc.setLineWidth(1);
        doc.line(0, 285, 10, 285);

        doc.text(`VeeBran Intelligence Engine • ${projectName} • Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    }

    const pdfOutput = doc.output('arraybuffer');
    return Buffer.from(pdfOutput);
}

// Helper to get page width in current units
const pageWidth = 210;
