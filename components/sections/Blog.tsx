"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    excerpt?: string;
    slug: string;
    createdAt: string;
    coverImage?: string;
}

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setPosts(data.slice(0, 3)); // Show latest 3
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="blog" className="py-24 bg-background/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                            Latest <span className="gradient-text">Articles</span>
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-xl">
                            Thoughts, tutorials, and insights on web development and design.
                        </p>
                    </motion.div>
                    <Link href="/blog" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
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
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-foreground/60 line-clamp-2 text-sm">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}

                    {posts.length === 0 && (
                        <div className="col-span-full text-center text-foreground/40 py-10">
                            No posts found.
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
