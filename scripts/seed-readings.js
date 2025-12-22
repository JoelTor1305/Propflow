const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching properties...');
    const properties = await prisma.property.findMany();

    if (properties.length === 0) {
        console.log('No properties found. Please run node seed-property.js first.');
        return;
    }

    const utilityTypes = [
        { type: 'Water', unit: 'gal', base: 5000 },
        { type: 'Electric', unit: 'kWh', base: 1200 },
        { type: 'Gas', unit: 'therms', base: 80 }
    ];

    for (const property of properties) {
        console.log(`Seeding readings for: ${property.name}`);

        for (const util of utilityTypes) {
            // Create 18 months of history
            for (let i = 0; i < 18; i++) {
                const date = new Date();
                date.setMonth(date.getMonth() - (18 - i));

                // Normal variance +/- 10%
                let value = util.base * (0.9 + Math.random() * 0.2);

                // Add an anomaly to the most recent month for some properties/utilities
                if (i === 17 && Math.random() > 0.4) {
                    value = util.base * 2.5; // High anomaly
                    console.log(`  [!] Adding anomaly for ${util.type} on ${property.name}`);
                }

                await prisma.utilityReading.create({
                    data: {
                        propertyId: property.id,
                        utilityType: util.type,
                        value: Math.round(value),
                        readingDate: date,
                        unit: util.unit
                    }
                });
            }
        }
    }

    console.log('Seed completed successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
