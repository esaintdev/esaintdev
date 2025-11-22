"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProjectFormData {
    title: string;
    description: string;
    imageUrl: string;
    demoUrl: string;
    repoUrl: string;
    techStack: string;
}

export default function ProjectFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== "new";
    const { register, handleSubmit, reset, setValue } = useForm<ProjectFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetch(`/api/projects/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setValue("title", data.title);
                    setValue("description", data.description);
                    setValue("imageUrl", data.imageUrl || "");
                    setValue("demoUrl", data.demoUrl || "");
                    setValue("repoUrl", data.repoUrl || "");
                    setValue("techStack", data.techStack);
                });
        }
    }, [isEditing, params.id, setValue]);

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/projects/${params.id}` : "/api/projects";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/projects");
            }
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/projects" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold font-heading">
                    {isEditing ? "Edit Project" : "New Project"}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="glass-panel p-6 rounded-xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
                        <input
                            {...register("techStack", { required: true })}
                            placeholder="React, Node.js, TypeScript"
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Demo URL</label>
                            <input
                                {...register("demoUrl")}
                                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Repo URL</label>
                            <input
                                {...register("repoUrl")}
                                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                            {...register("imageUrl")}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Save Project
                </button>
            </form>
        </div>
    );
}
