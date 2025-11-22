"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Save, Loader2 } from "lucide-react";

interface ProfileFormData {
    bio: string;
    headline: string;
    avatarUrl: string;
    resumeUrl: string;
    socialLinks: string;
}

export default function ProfilePage() {
    const { register, handleSubmit, setValue } = useForm<ProfileFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/profile")
            .then((res) => res.json())
            .then((data) => {
                setValue("bio", data.bio || "");
                setValue("headline", data.headline || "");
                setValue("avatarUrl", data.avatarUrl || "");
                setValue("resumeUrl", data.resumeUrl || "");
                setValue("socialLinks", data.socialLinks || "");
            });
    }, [setValue]);

    const onSubmit = async (data: ProfileFormData) => {
        setIsSubmitting(true);
        setMessage("");
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage("Error updating profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-heading mb-8">Profile Settings</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {message && (
                    <div className={`p-4 rounded-lg text-sm ${message.includes("Error") ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                        {message}
                    </div>
                )}

                <div className="glass-panel p-6 rounded-xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Headline</label>
                        <input
                            {...register("headline", { required: true })}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                            {...register("bio", { required: true })}
                            rows={6}
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

                    <div>
                        <label className="block text-sm font-medium mb-2">Resume URL</label>
                        <input
                            {...register("resumeUrl")}
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Social Links (JSON)</label>
                        <textarea
                            {...register("socialLinks")}
                            rows={4}
                            placeholder='{"twitter": "...", "linkedin": "..."}'
                            className="w-full px-4 py-2 rounded-lg bg-background/50 border border-white/10 focus:border-primary outline-none font-mono text-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Save Profile
                </button>
            </form>
        </div>
    );
}
