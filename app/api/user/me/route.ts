import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            console.log('[API/User/Me] No user ID in session:', JSON.stringify(session));
            return NextResponse.json({ error: 'Unauthorized', sessionExists: !!session }, { status: 401 });
        }

        console.log(`[API/User/Me] Fetching for user ID: ${session.user.id}, Email: ${session.user.email}`);

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

        let user = await prisma.user.findUnique({
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

        // Fallback: If ID search fails, try searching by email from session
        if (!user && session.user.email) {
            console.log(`[API/User/Me] ID search failed, trying email fallback for: ${session.user.email}`);
            user = await prisma.user.findUnique({
                where: { email: session.user.email },
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

            if (user) {
                console.log(`[API/User/Me] Email fallback successful. User ID in DB: ${user.id}`);
            }
        }

        if (!user) {
            console.error(`[API/User/Me] User NOT found. Session ID: ${session.user.id}, Session Email: ${session.user.email}`);
            return NextResponse.json({
                error: 'User not found',
                requestedId: session.user.id,
                requestedEmail: session.user.email,
                sessionKeys: Object.keys(session.user),
                message: `No user matches the session ID or email in the database.`
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
