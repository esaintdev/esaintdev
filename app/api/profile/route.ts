import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile || {});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        // Upsert ensures only one profile exists
        const profile = await prisma.profile.upsert({
            where: { id: body.id || 'default' }, // Assuming we might pass an ID, but usually we just want one. 
            // Actually, for single profile, we might need a fixed ID or just findFirst.
            // Let's use a simpler approach: findFirst then update or create.
            update: body,
            create: body,
        });

        // Since we don't have a unique constraint on a singleton in schema (unless we add one), 
        // let's refine this.
        // Better approach for singleton:
        const existing = await prisma.profile.findFirst();
        if (existing) {
            const updated = await prisma.profile.update({
                where: { id: existing.id },
                data: body,
            });
            return NextResponse.json(updated);
        } else {
            const created = await prisma.profile.create({
                data: body,
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
}
