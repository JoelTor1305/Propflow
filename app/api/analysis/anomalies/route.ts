import { analyzeProperties, PropertyData } from '@/lib/ai/anomaly-detection';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch real properties and their readings from DB
        const properties = await prisma.property.findMany({
            include: {
                utilityReadings: {
                    orderBy: { readingDate: 'asc' },
                    take: 100
                }
            }
        });

        if (properties.length === 0) {
            return NextResponse.json({
                total_properties_analyzed: 0,
                message: "No properties found in database"
            });
        }

        // Map database readings to the format expected by the analyzer
        const dataset: PropertyData[] = properties
            .filter(p => p.utilityReadings.length >= 3)
            .map(p => ({
                property_id: p.id,
                property_name: p.name,
                usage_history: p.utilityReadings.map(r => ({
                    month: r.readingDate.toISOString().split('T')[0].substring(0, 7),
                    usage: r.value
                }))
            }));

        if (dataset.length === 0) {
            return NextResponse.json({
                total_properties_analyzed: properties.length,
                properties_with_history: 0,
                message: "Insufficient reading history for analysis (need at least 3 readings per property)"
            });
        }

        const analysis = analyzeProperties(dataset);

        return NextResponse.json(analysis);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error in anomaly analysis API:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: message
        }, { status: 500 });
    }
}
