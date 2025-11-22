"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface SkillFormData {
    name: string;
    proficiency: number;
    category: string;
    icon: string;
}

export default function SkillFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== "new";
    const { register, handleSubmit, reset, setValue } = useForm<SkillFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetch(`/api/skills/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setValue("name", data.name);
                    setValue("proficiency", data.proficiency);
                    setValue("category", data.category || "");
                    setValue("icon", data.icon || "");
                });
        }
    }, [isEditing, params.id, setValue]);

    const onSubmit = async (data: SkillFormData) => {
        setIsSubmitting(true);
        try {
            // Ensure proficiency is a number
            data.proficiency = Number(data.proficiency);

            const url = isEditing ? `/api/skills/${params.id}` : "/api/skills";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/skills");
            }
        } catch (error) {
            console.error("Error saving skill:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/skills" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold font-heading">
                    {isEditing ? "Edit Skill" : "New Skill"}
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

                    <div>
                        <label className="block text-sm font-medium mb-2">Proficiency (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            {...register("proficiency", { required: true, min: 0, max: 100 })}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input
                            {...register("category")}
                            placeholder="Frontend, Backend, Tools"
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Icon (Optional)</label>
                        <input
                            {...register("icon")}
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
                    Save Skill
                </button>
            </form>
        </div>
    );
}
