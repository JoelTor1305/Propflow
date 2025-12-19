import { NextRequest, NextResponse } from 'next/server';
import { parseIngestionDocument, IngestionDocumentType } from '@/lib/ai/ingestion';

// pdf-parse is a CommonJS module, use require
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require('pdf-parse');

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const documentType = formData.get('documentType') as IngestionDocumentType || 'deed';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size must be less than 10MB' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let textContent = '';

        if (file.type === 'application/pdf') {
            const pdfData = await pdf(buffer);
            textContent = pdfData.text;
        } else {
            // Assume text/plain or try to decode
            textContent = buffer.toString('utf-8');
        }

        // Parse document with AI
        const extractedData = await parseIngestionDocument(textContent, documentType);

        return NextResponse.json({
            success: true,
            documentType,
            extractedData,
        });

    } catch (error) {
        console.error('Error parsing property document:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to parse document' },
            { status: 500 }
        );
    }
}
