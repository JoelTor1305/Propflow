const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding test users...');

    const testUsers = [
        {
            email: 'joel@propflow.ai',
            firstName: 'Joel',
            lastName: 'Torres',
            password: 'password123', // In production, never log or use weak passwords
            role: 'owner',
            phone: '555-0101'
        },
        {
            email: 'manager@propflow.ai',
            firstName: 'Sarah',
            lastName: 'Manager',
            password: 'password123',
            role: 'property_manager',
            phone: '555-0102'
        },
        {
            email: 'tenant@propflow.ai',
            firstName: 'Alex',
            lastName: 'Tenant',
            password: 'password123',
            role: 'tenant',
            phone: '555-0103'
        }
    ];

    for (const u of testUsers) {
        const existing = await prisma.user.findUnique({
            where: { email: u.email }
        });

        if (!existing) {
            const passwordHash = await bcrypt.hash(u.password, 10);
            const user = await prisma.user.create({
                data: {
                    email: u.email,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    name: `${u.firstName} ${u.lastName}`,
                    passwordHash,
                    role: u.role,
                    phone: u.phone
                }
            });
            console.log(`Created user: ${user.email} (Role: ${user.role})`);
        } else {
            console.log(`User already exists: ${u.email}`);
        }
    }

    console.log('User seeding completed.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
