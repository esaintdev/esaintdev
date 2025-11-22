"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface TestimonialFormData {
    name: string;
    role: string;
    company: string;
    content: string;
    avatarUrl: string;
}

export default function TestimonialFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== "new";
    const { register, handleSubmit, reset, setValue } = useForm<TestimonialFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetch(`/api/testimonials/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setValue("name", data.name);
                    setValue("role", data.role);
                    setValue("company", data.company || "");
                    setValue("content", data.content);
                    setValue("avatarUrl", data.avatarUrl || "");
                });
        }
    }, [isEditing, params.id, setValue]);

    const onSubmit = async (data: TestimonialFormData) => {
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/testimonials/${params.id}` : "/api/testimonials";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/testimonials");
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/testimonials" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold font-heading">
                    {isEditing ? "Edit Testimonial" : "New Testimonial"}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="glass-panel p-6 rounded-xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <input
                                {...register("role", { required: true })}
                                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Company</label>
                            <input
                                {...register("company")}
                                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Testimonial Content</label>
                        <textarea
                            {...register("content", { required: true })}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Avatar URL</label>
                        <input
                            {...register("avatarUrl")}
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
                    Save Testimonial
                </button>
            </form>
        </div>
    );
}
