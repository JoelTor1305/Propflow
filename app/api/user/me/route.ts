import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Handle anonymous Developer Mode
        if (session.user.id === 'dev-mode-user') {
            return NextResponse.json({
                id: 'dev-mode-user',
                email: 'dev@propflow.ai',
                firstName: 'Developer',
                lastName: '(Mode)',
                name: 'Developer Mode',
                role: 'OWNER',
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                firstName: true,
                lastName: true,
                role: true,
                phone: true,
            },
        });

        if (!user) {
            console.error(`[API/User/Me] User not found in database for ID: ${session.user.id}`);
            return NextResponse.json({
                error: 'User not found',
                requestedId: session.user.id,
                message: `No user matches the session ID in the database.`
            }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
