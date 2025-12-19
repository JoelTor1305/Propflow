import { prisma } from '@/lib/prisma';
import PropertiesClient from '@/components/properties/PropertiesClient';

export const dynamic = 'force-dynamic';

async function getProperties() {
    return await prisma.property.findMany({
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
}

export default async function PropertiesPage() {
    const properties = await getProperties();

    return <PropertiesClient initialProperties={properties} />;
}
