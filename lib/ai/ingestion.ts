import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export type IngestionDocumentType = 'deed' | 'lease';

export interface ExtractedPropertyData {
    ownerName?: string;
    propertyAddress?: string;
    legalDescription?: string;
    tenantName?: string;
    monthlyRent?: number;
    leaseStartDate?: string;
    leaseEndDate?: string;
    confidence: number;
}

export async function parseIngestionDocument(
    content: string,
    type: IngestionDocumentType
): Promise<ExtractedPropertyData> {
    try {
        const systemPrompt = `You are a specialized legal document parser for real estate. 
        Extract the following fields from the ${type === 'deed' ? 'Property Deed' : 'Lease Agreement'} provided.
        Return ONLY valid JSON.
        
        Fields to extract:
        ${type === 'deed'
                ? '- ownerName (The Grantee/New Owner)' +
                '\n- propertyAddress (Full physical address)' +
                '\n- legalDescription (Brief legal summary, e.g., Lot/Block)'
                : '- tenantName (Primary tenant)' +
                '\n- monthlyRent (Number only)' +
                '\n- leaseStartDate (YYYY-MM-DD)' +
                '\n- leaseEndDate (YYYY-MM-DD)'
            }
        
        If a field is not found, set it to null.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: content.substring(0, 15000) } // Truncate for token limits if necessary
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');

        return {
            ...result,
            confidence: 0.9 // Placeholder for now
        };
    } catch (error) {
        console.error('Error parsing document:', error);
        throw new Error('Failed to parse document');
    }
}
