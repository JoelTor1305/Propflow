import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const properties = await prisma.property.count();
    const tenants = await prisma.tenant.count();
    const pendingTenants = await prisma.tenant.count({ where: { status: 'pending' } });
    const complianceItems = await prisma.complianceItem.count();

    console.log({
        properties,
        tenants,
        pendingTenants,
        complianceItems
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
