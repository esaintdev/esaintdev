import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch counts in parallel for better performance
        const [totalProjects, totalBlogPosts, unreadMessages] = await Promise.all([
            prisma.project.count(),
            prisma.blogPost.count(),
            prisma.message.count({
                where: {
                    read: false,
                },
            }),
        ]);

        return NextResponse.json({
            totalProjects,
            totalBlogPosts,
            unreadMessages,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: 'Error fetching dashboard stats' },
            { status: 500 }
        );
    }
}

