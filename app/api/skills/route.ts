import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { proficiency: 'desc' },
        });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const skill = await prisma.skill.create({
            data: body,
        });
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating skill' }, { status: 500 });
    }
}
