import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzePropertyAnomalies } from '@/lib/ai/anomaly-detection';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    try {
        const readings = await prisma.utilityReading.findMany({
            where: propertyId ? { propertyId } : {},
            orderBy: { readingDate: 'desc' },
            include: { anomaly: true }
        });

        return NextResponse.json(readings);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { propertyId, utilityType, value, readingDate, unit } = body;

        if (!propertyId || !utilityType || value === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create the reading
        const reading = await prisma.utilityReading.create({
            data: {
                propertyId,
                utilityType,
                value: parseFloat(value),
                readingDate: readingDate ? new Date(readingDate) : new Date(),
                unit: unit || (utilityType === 'Water' ? 'gal' : utilityType === 'Electric' ? 'kWh' : 'therms')
            }
        });

        // Run anomaly detection for this property
        const analysis = await analyzePropertyAnomalies(propertyId);

        // Find if an anomaly was detected for this specific type in the recent data
        const detected = analysis.detection_results.find(r => r.utility_type === utilityType && r.anomaly_detected);

        if (detected) {
            // Update reading status
            await prisma.utilityReading.update({
                where: { id: reading.id },
                data: { isAnomaly: true }
            });

            // Persist the anomaly
            await prisma.anomaly.create({
                data: {
                    propertyId,
                    readingId: reading.id,
                    utilityType,
                    severity: detected.severity || 'low',
                    message: detected.alert_message,
                    thresholdValue: detected.anomaly_threshold,
                    actualValue: reading.value
                }
            });
        }

        return NextResponse.json({
            reading,
            anomalyDetected: !!detected,
            analysisResult: detected
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error recording reading:', error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
