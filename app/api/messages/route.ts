import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    // Public endpoint for contact form
    try {
        const body = await req.json();
        const message = await prisma.message.create({
            data: body,
        });
        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: 'Error sending message' }, { status: 500 });
    }
}
