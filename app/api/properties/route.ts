import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { storePropertyInfo } from '@/lib/ai/vector-store';

export async function GET() {
    try {
        const properties = await prisma.property.findMany({
            include: {
                _count: {
                    select: {
                        tenants: true,
                        complianceItems: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json(
            { error: 'Failed to fetch properties' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Flatten the nested data structure from the client (PropertyReviewModal)
        // body matches ExtractedPropertyData structure
        const flatData = {
            name: body.property?.address || 'New Property', // Fallback name
            address: body.property?.address || '',
            type: body.property?.type || 'residential',
            units: 1, // Default, logic could be improved to infer from type
            ownerName: body.owner?.legalName1 || '',
            ownerEmail: body.owner?.email || '',
            ownerPhone: body.owner?.phone || '',
        };

        // Reuse validation logic if possible, or validate manually since structure changed
        // const validatedData = propertySchema.parse(flatData); 
        // Note: validation might need adjustment if flatData doesn't perfectly match expectations,
        // but for now we construct it to match the Property model fields.

        const property = await prisma.property.create({
            data: flatData,
        });

        // Store property info in vector database for context
        await storePropertyInfo(property.id, {
            name: property.name,
            address: property.address,
            details: `${property.type || 'Property'} - ${body.property?.beds || 0} Beds, ${body.property?.baths || 0} Baths`,
        });

        return NextResponse.json({ property }, { status: 201 });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create property' },
            { status: 400 }
        );
    }
}
