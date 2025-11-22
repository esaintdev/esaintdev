"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface BlogFormData {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    published: boolean;
}

export default function BlogFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== "new";
    const { register, handleSubmit, reset, setValue, watch } = useForm<BlogFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-generate slug from title
    const title = watch("title");
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setValue("slug", slug);
        }
    }, [title, isEditing, setValue]);

    useEffect(() => {
        if (isEditing) {
            fetch(`/api/blog/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setValue("title", data.title);
                    setValue("slug", data.slug);
                    setValue("content", data.content);
                    setValue("excerpt", data.excerpt || "");
                    setValue("coverImage", data.coverImage || "");
                    setValue("published", data.published);
                });
        }
    }, [isEditing, params.id, setValue]);

    const onSubmit = async (data: BlogFormData) => {
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/blog/${params.id}` : "/api/blog";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/blog");
            }
        } catch (error) {
            console.error("Error saving post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blog" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold font-heading">
                    {isEditing ? "Edit Post" : "New Post"}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel p-6 rounded-xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    {...register("title", { required: true })}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
                                <textarea
                                    {...register("content", { required: true })}
                                    rows={15}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Slug</label>
                                <input
                                    {...register("slug", { required: true })}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Excerpt</label>
                                <textarea
                                    {...register("excerpt")}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Cover Image URL</label>
                                <input
                                    {...register("coverImage")}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    {...register("published")}
                                    id="published"
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="published" className="text-sm font-medium">Published</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            Save Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
