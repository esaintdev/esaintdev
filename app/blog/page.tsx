"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    excerpt?: string;
    slug: string;
    createdAt: string;
    coverImage?: string;
}

export default function BlogListingPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setPosts(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-background py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                        The <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Insights, tutorials, and thoughts on software development, design, and technology.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="aspect-[4/3] bg-gray-800 rounded-xl overflow-hidden mb-4 relative">
                                        {post.coverImage ? (
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                <span className="text-4xl">📝</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-sm text-primary font-medium">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-foreground/60 line-clamp-3 text-sm">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}

                        {posts.length === 0 && (
                            <div className="col-span-full text-center text-foreground/40 py-20">
                                No posts found. Check back later!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
