import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching testimonials' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const testimonial = await prisma.testimonial.create({
            data: body,
        });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating testimonial' }, { status: 500 });
    }
}
