import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const skill = await prisma.skill.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating skill' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await prisma.skill.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Skill deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting skill' }, { status: 500 });
    }
}
