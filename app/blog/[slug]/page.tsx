import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

async function getPost(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });
    return post;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await params as it's now a Promise in Next.js 15+
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-background py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                        <time dateTime={post.createdAt.toISOString()}>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </time>
                        {post.category && (
                            <>
                                <span>•</span>
                                <span className="text-primary">{post.category}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                        {post.title}
                    </h1>
                    {post.coverImage && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
